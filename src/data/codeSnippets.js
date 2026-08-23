// Curated production-quality architectural snippets for portfolio projects

export const projectCodeSnippets = {
  faithquest: [
    {
      fileName: "PointEngine.ts",
      language: "typescript",
      description: "Core gamification state machine for real-time points, level progression, and spiritual milestones.",
      code: `export interface StudentProfile {
  id: string;
  name: string;
  totalPoints: number;
  level: number;
  badges: string[];
  attendanceStreak: number;
  milestonesUnlocked: string[];
}

export interface PointTransaction {
  studentId: string;
  points: number;
  category: 'quiz' | 'attendance' | 'memorization' | 'outreach';
  timestamp: string;
  awardedBy: string;
}

export class PointEngine {
  private static readonly POINTS_PER_LEVEL = 150;
  private static readonly STREAK_BONUS_MULTIPLIER = 1.25;

  /**
   * Calculates total earned points with streak bonus modifiers
   */
  public static awardPoints(
    student: StudentProfile,
    transaction: PointTransaction
  ): { updatedStudent: StudentProfile; newBadges: string[]; leveledUp: boolean } {
    let finalPoints = transaction.points;

    // Apply streak multiplier for continuous active attendance
    if (student.attendanceStreak >= 3) {
      finalPoints = Math.round(finalPoints * this.STREAK_BONUS_MULTIPLIER);
    }

    const previousLevel = student.level;
    const newTotalPoints = student.totalPoints + finalPoints;
    const newLevel = Math.floor(newTotalPoints / this.POINTS_PER_LEVEL) + 1;
    const leveledUp = newLevel > previousLevel;

    // Evaluate milestone unlocks
    const newBadges: string[] = [];
    if (newTotalPoints >= 500 && !student.badges.includes('Scripture Scholar')) {
      newBadges.push('Scripture Scholar');
    }
    if (student.attendanceStreak >= 10 && !student.badges.includes('Faithful Steward')) {
      newBadges.push('Faithful Steward');
    }

    const updatedStudent: StudentProfile = {
      ...student,
      totalPoints: newTotalPoints,
      level: newLevel,
      badges: [...student.badges, ...newBadges],
      attendanceStreak: transaction.category === 'attendance' 
        ? student.attendanceStreak + 1 
        : student.attendanceStreak
    };

    return { updatedStudent, newBadges, leveledUp };
  }
}`
    },
    {
      fileName: "LiveDashboard.tsx",
      language: "typescript",
      description: "Teacher live control dashboard with optimistic UI updates and instant student state dispatching.",
      code: `import React, { useState, useTransition } from 'react';
import { PointEngine, StudentProfile } from './PointEngine';
import { Trophy, Award, Zap, CheckCircle2 } from 'lucide-react';

interface Props {
  initialStudents: StudentProfile[];
  teacherId: string;
}

export const LiveDashboard: React.FC<Props> = ({ initialStudents, teacherId }) => {
  const [students, setStudents] = useState<StudentProfile[]>(initialStudents);
  const [selectedCategory, setSelectedCategory] = useState<'quiz' | 'memorization'>('quiz');
  const [isPending, startTransition] = useTransition();

  const handleQuickAward = (studentId: string, basePoints: number) => {
    startTransition(() => {
      setStudents((prev) =>
        prev.map((student) => {
          if (student.id !== studentId) return student;

          const { updatedStudent } = PointEngine.awardPoints(student, {
            studentId,
            points: basePoints,
            category: selectedCategory,
            timestamp: new Date().toISOString(),
            awardedBy: teacherId
          });

          return updatedStudent;
        })
      );
    });
  };

  return (
    <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="text-amber-400" size={22} />
            Classroom Gamification Controller
          </h2>
          <p className="text-xs text-slate-400">Real-time attendance & milestone sync</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {students.map((student) => (
          <div key={student.id} className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-100">{student.name}</p>
              <p className="text-xs text-amber-400 font-mono">
                Level {student.level} • {student.totalPoints} PTS
              </p>
            </div>
            <button
              onClick={() => handleQuickAward(student.id, 25)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold rounded-lg transition"
            >
              +25 PTS
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};`
    }
  ],
  "crm-system": [
    {
      fileName: "CustomerController.cs",
      language: "csharp",
      description: "ASP.NET / C# Web API Controller handling layered customer lifecycle operations with async transaction validation.",
      code: `using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CRM.Core.Entities;
using CRM.Core.Interfaces;
using CRM.Infrastructure.DTOs;

namespace CRM.WebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Produces("application/json")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IAuditLogger _auditLogger;

        public CustomerController(
            ICustomerRepository customerRepository, 
            IAuditLogger auditLogger)
        {
            _customerRepository = customerRepository ?? throw new ArgumentNullException(nameof(customerRepository));
            _auditLogger = auditLogger ?? throw new ArgumentNullException(nameof(auditLogger));
        }

        /// <summary>
        /// Retrieves paginated customer records with optional pipeline status filter
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<PagedResult<CustomerResponseDto>>> GetCustomers(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] PipelineStage? stage = null)
        {
            var customers = await _customerRepository.GetPagedCustomersAsync(page, pageSize, stage);
            return Ok(customers);
        }

        /// <summary>
        /// Creates a new customer account with strict duplicate checks and audit logging
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<CustomerResponseDto>> CreateCustomer([FromBody] CreateCustomerRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingCustomer = await _customerRepository.FindByEmailAsync(request.Email);
            if (existingCustomer != null)
            {
                return Conflict(new { message = "A customer with this email address already exists." });
            }

            var newCustomer = new Customer
            {
                Id = Guid.NewGuid(),
                FullName = request.FullName,
                Email = request.Email.ToLowerInvariant(),
                Company = request.Company,
                Status = CustomerStatus.Active,
                CurrentStage = PipelineStage.Lead,
                CreatedAt = DateTime.UtcNow
            };

            await _customerRepository.AddAsync(newCustomer);
            await _auditLogger.LogActionAsync(newCustomer.Id, "CUSTOMER_CREATED", User.Identity?.Name ?? "System");

            return CreatedAtAction(nameof(GetCustomers), new { id = newCustomer.Id }, newCustomer);
        }
    }
}`
    },
    {
      fileName: "Schema_Relational.sql",
      language: "sql",
      description: "Relational database schema architecture with normalized entities, foreign key constraints, and indexing.",
      code: `-- Customer Relationship Management Relational Schema
-- Database Engine: PostgreSQL / Microsoft SQL Server

CREATE TABLE Customers (
    CustomerID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    FullName NVARCHAR(150) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PhoneNumber NVARCHAR(30) NULL,
    Company NVARCHAR(150) NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'Active',
    PipelineStage NVARCHAR(50) NOT NULL DEFAULT 'Lead',
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE Deals (
    DealID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    CustomerID UNIQUEIDENTIFIER NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    ExpectedValue DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    Stage NVARCHAR(50) NOT NULL,
    ProbabilityPercentage INT CHECK (ProbabilityPercentage BETWEEN 0 AND 100),
    TargetCloseDate DATE NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Deals_Customers FOREIGN KEY (CustomerID) 
        REFERENCES Customers(CustomerID) ON DELETE CASCADE
);

CREATE TABLE InteractionLogs (
    LogID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    CustomerID UNIQUEIDENTIFIER NOT NULL,
    InteractionType NVARCHAR(50) NOT NULL, -- Call, Email, Meeting, Note
    Summary NVARCHAR(MAX) NOT NULL,
    LoggedBy NVARCHAR(100) NOT NULL,
    LoggedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Logs_Customers FOREIGN KEY (CustomerID) 
        REFERENCES Customers(CustomerID) ON DELETE CASCADE
);

-- Fast lookup indexes for filtered querying
CREATE NONCLUSTERED INDEX IX_Customers_Pipeline ON Customers (PipelineStage, Status);
CREATE NONCLUSTERED INDEX IX_Deals_CustomerID ON Deals (CustomerID);
CREATE NONCLUSTERED INDEX IX_InteractionLogs_CustomerID ON InteractionLogs (CustomerID, LogedAt DESC);`
    }
  ],
  "rental-ops-manager": [
    {
      fileName: "ReservationService.ts",
      language: "typescript",
      description: "Booking collision detection algorithm preventing overlapping asset reservation dates.",
      code: `export interface BookingRequest {
  equipmentId: string;
  clientId: string;
  startDate: Date;
  endDate: Date;
}

export interface ReservationConflictResult {
  hasConflict: boolean;
  conflictingBookingId?: string;
  reason?: string;
}

export class ReservationManager {
  /**
   * Evaluates date boundary collisions for equipment rental scheduling
   */
  public static checkAvailability(
    newRequest: BookingRequest,
    existingBookings: Array<{ id: string; startDate: Date; endDate: Date; status: string }>
  ): ReservationConflictResult {
    if (newRequest.startDate >= newRequest.endDate) {
      return {
        hasConflict: true,
        reason: 'Start date must precede the end return date.'
      };
    }

    for (const booking of existingBookings) {
      // Ignore cancelled or completed rentals
      if (booking.status === 'Cancelled' || booking.status === 'Returned') {
        continue;
      }

      // Mathematical interval overlap formula: (StartA <= EndB) and (EndA >= StartB)
      const isOverlapping = 
        newRequest.startDate <= booking.endDate && 
        newRequest.endDate >= booking.startDate;

      if (isOverlapping) {
        return {
          hasConflict: true,
          conflictingBookingId: booking.id,
          reason: \`Selected dates overlap with existing reservation #\${booking.id}\`
        };
      }
    }

    return { hasConflict: false };
  }
}`
    }
  ],
  "developer-portfolio": [
    {
      fileName: "github.ts",
      language: "typescript",
      description: "Live GitHub API synchronization service with client-side caching & dynamic dev status evaluation.",
      code: `const CACHE_KEY = 'portfolio_github_repos_v2';
const CACHE_DURATION_MS = 1000 * 60 * 30; // 30 minutes cache

export interface GitHubRepoMetric {
  id: number;
  name: string;
  stars: number;
  forks: number;
  language: string;
  pushedAt: string;
  status: 'Active' | 'Maintained' | 'Archived';
}

export function computeDevStatus(pushedAt: string, isArchived: boolean): 'Active' | 'Maintained' | 'Archived' {
  if (isArchived) return 'Archived';
  
  const daysSincePush = Math.floor(
    (Date.now() - new Date(pushedAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSincePush <= 60) return 'Active';
  if (daysSincePush <= 180) return 'Maintained';
  return 'Archived';
}

export async function fetchUserRepos(username: string, force = false): Promise<GitHubRepoMetric[]> {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!force && cached) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION_MS) {
      return data;
    }
  }

  const response = await fetch(\`https://api.github.com/users/\${username}/repos?sort=pushed&per_page=100\`);
  if (!response.ok) throw new Error('GitHub API rate limit or error');
  
  const repos = await response.json();
  const formatted: GitHubRepoMetric[] = repos.map((r: any) => ({
    id: r.id,
    name: r.name,
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language || 'Code',
    pushedAt: r.pushed_at,
    status: computeDevStatus(r.pushed_at, r.archived)
  }));

  localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: formatted }));
  return formatted;
}`
    }
  ]
};
