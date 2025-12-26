import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DoctorSocialMedia = () => {
    const navigate = useNavigate();
    const [socialLinks, setSocialLinks] = useState([
        { platform: 'facebook', url: '' },
        { platform: 'twitter', url: '' },
        { platform: 'linkedin', url: '' },
        { platform: 'instagram', url: '' }
    ]);

    const handleAddRow = () => {
        setSocialLinks([...socialLinks, { platform: '', url: '' }]);
    };

    const handleRemoveRow = (index: number) => {
        const newLinks = socialLinks.filter((_, i) => i !== index);
        setSocialLinks(newLinks);
    };

    const handlePlatformChange = (value: string, index: number) => {
        const newLinks = [...socialLinks];
        newLinks[index].platform = value;
        setSocialLinks(newLinks);
    };

    const handleUrlChange = (value: string, index: number) => {
        const newLinks = [...socialLinks];
        newLinks[index].url = value;
        setSocialLinks(newLinks);
    };

    const handleSave = () => {
        console.log('Saving social links:', socialLinks);
        toast.success("Social media links saved successfully!");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Social Media</h1>

            <Card className="max-w-4xl bg-white border border-gray-100 shadow-sm rounded-xl">
                <CardContent className="p-8">

                    <div className="flex justify-end mb-8">
                        <Button
                            onClick={handleAddRow}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6"
                        >
                            Add New Social Media
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {socialLinks.map((link, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                <div className="w-full md:w-1/3">
                                    <Select
                                        value={link.platform}
                                        onValueChange={(value) => handlePlatformChange(value, index)}
                                    >
                                        <SelectTrigger className="w-full h-11 border-gray-200 rounded-lg bg-white">
                                            <SelectValue placeholder="Select Platform" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="facebook">Facebook</SelectItem>
                                            <SelectItem value="twitter">Twitter</SelectItem>
                                            <SelectItem value="linkedin">Linkedin</SelectItem>
                                            <SelectItem value="instagram">Instagram</SelectItem>
                                            <SelectItem value="youtube">Youtube</SelectItem>
                                            <SelectItem value="website">Website</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="w-full md:flex-1 flex gap-2">
                                    <Input
                                        placeholder="Add Url"
                                        value={link.url}
                                        onChange={(e) => handleUrlChange(e.target.value, index)}
                                        className="h-11 border-gray-200 rounded-lg flex-1"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemoveRow(index)}
                                        className="text-red-400 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {socialLinks.length === 0 && (
                        <div className="text-center py-8 text-gray-400 text-sm">
                            No social media links added. Click "Add New Social Media" to start.
                        </div>
                    )}

                    <div className="flex justify-center mt-12">
                        <Button
                            onClick={handleSave}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-12 h-11 rounded-lg shadow-md shadow-blue-200"
                        >
                            Save Changes
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
};

export default DoctorSocialMedia;
