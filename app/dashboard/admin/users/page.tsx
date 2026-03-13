"use client";

import { useState, useEffect } from "react";
import { getAllUsers } from "@/app/actions/admin-actions";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Users } from "lucide-react";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");

    useEffect(() => {
        loadUsers();
    }, [roleFilter]); // Reload when filter changes

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            loadUsers();
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const loadUsers = async () => {
        setIsLoading(true);
        const data = await getAllUsers({ role: roleFilter, search });
        setUsers(data);
        setIsLoading(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                        <Users className="w-7 h-7 text-cyan-400" />
                        Platform Users
                    </h1>
                    <p className="text-slate-400">View and search all registered users</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search name or email..."
                            className="bg-slate-900 border-cyan-500/20 text-white pl-10 placeholder:text-slate-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-[150px] bg-slate-900 border-cyan-500/20 text-white">
                            <SelectValue placeholder="Filter Role" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-cyan-500/20 text-white">
                            <SelectItem value="ALL">All Roles</SelectItem>
                            <SelectItem value="STUDENT">Student</SelectItem>
                            <SelectItem value="MENTOR">Mentor</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="INVESTOR">Investor</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card className="bg-slate-900/60 border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-cyan-400" /></div>
                    ) : (
                        <div className="w-full">
                            {users.length === 0 ? (
                                <div className="text-center py-12 text-slate-500">
                                    No users found matching your search.
                                </div>
                            ) : (
                                <div className="min-w-full">
                                    <div className="grid grid-cols-12 gap-4 p-4 bg-slate-950/80 text-xs font-medium text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                                        <div className="col-span-4">USER</div>
                                        <div className="col-span-2">ROLE</div>
                                        <div className="col-span-4">DETAILS</div>
                                        <div className="col-span-2 text-right">JOINED</div>
                                    </div>
                                    <div className="divide-y divide-slate-800">
                                        {users.map((user) => (
                                            <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-cyan-900/10 transition-colors">
                                                <div className="col-span-4 overflow-hidden">
                                                    <div className="font-medium text-white truncate">{user.name || "Unnamed"}</div>
                                                    <div className="text-sm text-slate-500 truncate font-mono text-xs">{user.email}</div>
                                                </div>
                                                <div className="col-span-2">
                                                    <Badge variant="secondary" className={
                                                        user.role === "MENTOR" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                                                            user.role === "ADMIN" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                                                                user.role === "HR" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" :
                                                                    user.role === "INVESTOR" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                                                                        "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                                    }>
                                                        {user.role}
                                                    </Badge>
                                                </div>
                                                <div className="col-span-4 text-sm text-slate-400 truncate">
                                                    {user.role === "STUDENT" && (
                                                        <>
                                                            {user.studentProfile?.subscription === "PRO" && <Badge variant="outline" className="mr-2 border-cyan-500/20 text-cyan-400 text-[10px] h-5 bg-cyan-500/5">PAID</Badge>}
                                                            {user.studentProfile?.college && <span className="text-xs">{user.studentProfile.college}</span>}
                                                        </>
                                                    )}
                                                    {user.role === "HR" && user.hrProfile?.company}
                                                    {user.role === "INVESTOR" && user.investorProfile?.company}
                                                    {user.role === "MENTOR" && user.mentorProfile?.specialization}
                                                </div>
                                                <div className="col-span-2 text-right text-sm text-slate-500 font-mono text-xs">
                                                    {format(new Date(user.createdAt), "MMM d, yyyy")}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
