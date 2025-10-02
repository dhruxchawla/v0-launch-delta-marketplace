"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Target, Award, BookOpen, BarChart3, Activity, Flame } from "lucide-react"
import { useState } from "react"

const progressData = {
  weeklyGoal: { target: 15, completed: 12, unit: "hours" },
  monthlyGoal: { target: 3, completed: 2, unit: "courses" },
  currentStreak: 7,
  longestStreak: 21,
  totalHours: 156,
  coursesCompleted: 8,
  averageScore: 92,
  skillsLearned: 24,
}

const weeklyActivity = [
  { day: "Mon", hours: 2.5, completed: true },
  { day: "Tue", hours: 1.8, completed: true },
  { day: "Wed", hours: 3.2, completed: true },
  { day: "Thu", hours: 2.1, completed: true },
  { day: "Fri", hours: 1.5, completed: true },
  { day: "Sat", hours: 0.9, completed: false },
  { day: "Sun", hours: 0, completed: false },
]

const skillProgress = [
  { skill: "Ethical Hacking", level: 85, category: "Penetration Testing" },
  { skill: "Network Security", level: 78, category: "Infrastructure" },
  { skill: "Digital Forensics", level: 92, category: "Investigation" },
  { skill: "Cloud Security", level: 65, category: "Cloud Computing" },
  { skill: "Incident Response", level: 88, category: "Operations" },
  { skill: "Risk Management", level: 72, category: "Governance" },
]

const recentAchievements = [
  {
    id: 1,
    title: "Course Completion Streak",
    description: "Completed 3 courses in a row",
    icon: "🔥",
    date: "2024-06-15",
    points: 150,
  },
  {
    id: 2,
    title: "Perfect Score",
    description: "Scored 100% on Advanced Penetration Testing",
    icon: "🎯",
    date: "2024-06-10",
    points: 200,
  },
  {
    id: 3,
    title: "Learning Marathon",
    description: "Studied for 8 hours in a single day",
    icon: "⚡",
    date: "2024-06-05",
    points: 100,
  },
  {
    id: 4,
    title: "Skill Master",
    description: "Mastered Digital Forensics fundamentals",
    icon: "🏆",
    date: "2024-05-28",
    points: 250,
  },
]

export default function BuyerProgress() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")

  const weeklyProgress = (progressData.weeklyGoal.completed / progressData.weeklyGoal.target) * 100
  const monthlyProgress = (progressData.monthlyGoal.completed / progressData.monthlyGoal.target) * 100

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Learning Progress</h1>
        <p className="text-slate-600 mt-2">Track your learning journey and achievements</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressData.currentStreak}</div>
            <p className="text-xs text-muted-foreground">days • Best: {progressData.longestStreak} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressData.totalHours}h</div>
            <p className="text-xs text-muted-foreground">Across {progressData.coursesCompleted} completed courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressData.averageScore}%</div>
            <p className="text-xs text-muted-foreground">Excellent performance level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Learned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressData.skillsLearned}</div>
            <p className="text-xs text-muted-foreground">Professional skills acquired</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="goals" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Weekly Learning Goal
                </CardTitle>
                <CardDescription>Track your weekly learning progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {progressData.weeklyGoal.completed} / {progressData.weeklyGoal.target} hours
                    </span>
                    <span className="text-sm text-muted-foreground">{Math.round(weeklyProgress)}%</span>
                  </div>
                  <Progress value={weeklyProgress} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    {progressData.weeklyGoal.target - progressData.weeklyGoal.completed} hours remaining this week
                  </p>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {weeklyActivity.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
                      <div
                        className={`h-8 rounded-sm flex items-center justify-center text-xs font-medium ${
                          day.completed
                            ? "bg-primary text-primary-foreground"
                            : day.hours > 0
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {day.hours > 0 ? `${day.hours}h` : "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Monthly Course Goal
                </CardTitle>
                <CardDescription>Complete courses each month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {progressData.monthlyGoal.completed} / {progressData.monthlyGoal.target} courses
                    </span>
                    <span className="text-sm text-muted-foreground">{Math.round(monthlyProgress)}%</span>
                  </div>
                  <Progress value={monthlyProgress} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    {progressData.monthlyGoal.target - progressData.monthlyGoal.completed} courses remaining this month
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Ethical Hacking Fundamentals</span>
                    </div>
                    <Badge variant="default" className="text-xs">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Network Security Essentials</span>
                    </div>
                    <Badge variant="default" className="text-xs">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Cloud Security Architecture</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      In Progress
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Learning Activity
              </CardTitle>
              <CardDescription>Your learning patterns and consistency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">12h</div>
                    <p className="text-sm text-muted-foreground">This Week</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">45h</div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">156h</div>
                    <p className="text-sm text-muted-foreground">All Time</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Recent Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Completed lesson: "SQL Injection Techniques"</p>
                        <p className="text-xs text-muted-foreground">2 hours ago • Advanced Penetration Testing</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        +25 XP
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Started new course: "Cloud Security Architecture"</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        +10 XP
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Earned certificate: "Network Security Essentials"</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        +100 XP
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Skill Development
              </CardTitle>
              <CardDescription>Track your expertise across different cybersecurity domains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillProgress.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">{skill.skill}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {skill.category}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
              <CardDescription>Your learning milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-xs">
                        +{achievement.points} XP
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
