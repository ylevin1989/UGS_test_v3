"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, UserPlus, Trash2 } from "lucide-react";
import { getUsers, createUser, deleteUser } from "@/app/actions/users";

export function UsersList() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRole, setNewRole] = useState("Client");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
    };

    const handleCreateUser = async () => {
        if (!newUsername || !newPassword) {
            toast.error("Please fill all fields");
            return;
        }

        const res = await createUser({
            username: newUsername,
            password: newPassword,
            role: newRole
        });

        if (res.success) {
            toast.success("User created successfully!");
            setNewUsername("");
            setNewPassword("");
            setNewRole("Client");
            loadUsers();
        } else {
            toast.error(res.error || "Failed to create user");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        const res = await deleteUser(id);
        if (res.success) {
            toast.success("User deleted");
            loadUsers();
        } else {
            toast.error("Failed to delete user");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8">Управление пользователями</h2>

            <Card className="p-6 glass border-white/10 space-y-4">
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-4">Создать пользователя</h3>
                <div className="grid md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Логин</label>
                        <Input
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="bg-zinc-900 border-white/10 rounded-xl"
                            placeholder="username"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Пароль</label>
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="bg-zinc-900 border-white/10 rounded-xl"
                            placeholder="password"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Роль</label>
                        <Select value={newRole} onValueChange={setNewRole}>
                            <SelectTrigger className="bg-zinc-900 border-white/10 rounded-xl h-10">
                                <SelectValue placeholder="Роль" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                <SelectItem value="Admin">Админ</SelectItem>
                                <SelectItem value="Manager">Менеджер</SelectItem>
                                <SelectItem value="Creator">Креатор</SelectItem>
                                <SelectItem value="Client">Клиент</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Button
                            onClick={handleCreateUser}
                            className="w-full bg-primary hover:bg-primary/80 text-black font-bold h-10 rounded-xl"
                        >
                            <UserPlus size={18} className="mr-2" /> Добавить
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                    <Card key={user.id} className="p-6 glass border-white/10 space-y-4 relative group">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <div className="font-bold text-lg text-white">{user.username}</div>
                                <div className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 inline-block px-2 py-1 rounded-md">
                                    {user.role}
                                </div>
                            </div>
                            {user.username !== 'Admin' && (
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="text-destructive opacity-50 hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
                            Создан: {new Date(user.created_at).toLocaleDateString()}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
