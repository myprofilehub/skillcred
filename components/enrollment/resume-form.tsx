
'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function ResumeForm({ onSubmit, loading }: { onSubmit: (data: any) => void, loading: boolean }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [skills, setSkills] = useState<string[]>(['']);
    const [education, setEducation] = useState([{ school: '', degree: '', year: '' }]);

    const addSkill = () => setSkills([...skills, '']);
    const removeSkill = (index: number) => setSkills(skills.filter((_, i) => i !== index));
    const updateSkill = (index: number, value: string) => {
        const newSkills = [...skills];
        newSkills[index] = value;
        setSkills(newSkills);
    };

    const addEducation = () => setEducation([...education, { school: '', degree: '', year: '' }]);
    const removeEducation = (index: number) => setEducation(education.filter((_, i) => i !== index));
    const updateEducation = (index: number, field: string, value: string) => {
        const newEdu: any = [...education];
        newEdu[index][field] = value;
        setEducation(newEdu);
    };

    const onFormSubmit = (data: any) => {
        const cleanSkills = skills.filter(s => s.trim() !== '');
        onSubmit({ ...data, skills: cleanSkills, education });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                        id="bio"
                        placeholder="I am a passionate developer..."
                        {...register('bio', { required: true })}
                        className="bg-slate-800 border-slate-700 h-32"
                    />
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                        <Input id="linkedin" {...register('linkedinUrl')} className="bg-slate-800 border-slate-700" placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="github">GitHub URL</Label>
                        <Input id="github" {...register('githubUrl')} className="bg-slate-800 border-slate-700" placeholder="https://github.com/..." />
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <Input
                                value={skill}
                                onChange={(e) => updateSkill(index, e.target.value)}
                                className="bg-slate-800 border-slate-700 w-32 h-8 text-sm"
                                placeholder="Skill"
                            />
                            {index > 0 && (
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)} className="h-8 w-8 text-red-400">
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addSkill} className="h-8 border-dashed border-slate-600">
                        <Plus className="w-3 h-3 mr-1" /> Add
                    </Button>
                </div>
            </div>

            <div className="space-y-3">
                <Label>Education</Label>
                {education.map((edu, index) => (
                    <div key={index} className="grid md:grid-cols-3 gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <Input
                            placeholder="College/University"
                            value={edu.school}
                            onChange={(e) => updateEducation(index, 'school', e.target.value)}
                            className="bg-slate-800 border-slate-700 h-8 text-sm"
                        />
                        <Input
                            placeholder="Degree (e.g. B.Tech)"
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            className="bg-slate-800 border-slate-700 h-8 text-sm"
                        />
                        <div className="flex gap-2">
                            <Input
                                placeholder="Year"
                                value={edu.year}
                                onChange={(e) => updateEducation(index, 'year', e.target.value)}
                                className="bg-slate-800 border-slate-700 h-8 text-sm"
                            />
                            {index > 0 && (
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeEducation(index)} className="h-8 w-8 text-red-400">
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addEducation} className="w-full border-dashed border-slate-600">
                    <Plus className="w-3 h-3 mr-1" /> Add Education
                </Button>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                {loading ? "Saving..." : "Save & Continue"}
            </Button>
        </form>
    );
}
