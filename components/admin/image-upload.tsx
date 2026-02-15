"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";
import { uploadImage } from "@/app/actions/upload";
import { toast } from "sonner";
import Image from "next/image";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const result = await uploadImage(formData);
            if (result.success && result.url) {
                onChange(result.url);
                toast.success("Изображение загружено");
            } else {
                toast.error(result.error || "Ошибка загрузки");
            }
        } catch (error) {
            toast.error("Ошибка при подключении к серверу");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            {label && <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</label>}
            <div className="flex flex-col gap-4">
                {value ? (
                    <div className="relative aspect-video w-full max-w-[300px] rounded-xl overflow-hidden border border-white/10 group">
                        <Image
                            src={value}
                            alt="Uploaded"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => onChange("")}
                                className="h-8 w-8 p-0 rounded-full"
                            >
                                <X size={14} />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="aspect-video w-full max-w-[300px] rounded-xl border-2 border-dashed border-white/5 bg-zinc-900/50 flex flex-col items-center justify-center text-zinc-600 gap-2">
                        <ImageIcon size={32} />
                        <span className="text-xs font-medium">Нет изображения</span>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id={`file-upload-${label || 'img'}`}
                        disabled={uploading}
                    />
                    <label
                        htmlFor={`file-upload-${label || 'img'}`}
                        className={`inline-flex items-center justify-center h-10 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold cursor-pointer transition-all ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {uploading ? <Loader2 size={14} className="mr-2 animate-spin" /> : <Upload size={14} className="mr-2" />}
                        {uploading ? "Загрузка..." : "Загрузить фото"}
                    </label>

                    {/* Fallback for manual URL entry */}
                    <Input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Или вставьте URL"
                        className="h-10 text-xs bg-zinc-900 border-white/10 rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
}
