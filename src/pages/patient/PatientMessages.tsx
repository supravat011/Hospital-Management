import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Search, MoreHorizontal, Paperclip, Smile, Mic, Send,
    Phone, Video, MoreVertical, Check, CheckCheck, Play
} from 'lucide-react';
import PatientSidebar from '@/components/PatientSidebar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PatientMessages = () => {
    const [messageInput, setMessageInput] = useState('');

    const ONLINE_USERS = [
        { id: 1, image: 'https://randomuser.me/api/portraits/men/1.jpg', name: 'User 1' },
        { id: 2, image: 'https://randomuser.me/api/portraits/women/2.jpg', name: 'User 2' },
        { id: 3, image: 'https://randomuser.me/api/portraits/men/3.jpg', name: 'User 3' },
        { id: 4, image: 'https://randomuser.me/api/portraits/women/4.jpg', name: 'User 4' },
        { id: 5, image: 'https://randomuser.me/api/portraits/women/5.jpg', name: 'User 5' },
    ];

    const PINNED_CHATS = [
        {
            id: 1,
            name: 'Adrian Marshall',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            lastMessage: 'Have you called them?',
            time: 'Just Now',
            isPinned: true,
            isRead: true,
            online: true
        },
        {
            id: 2,
            name: 'Dr Joseph Boyd',
            image: 'https://randomuser.me/api/portraits/men/85.jpg',
            lastMessage: 'Video',
            type: 'video',
            time: 'Yesterday',
            isPinned: true,
            isRead: false,
            online: false
        },
        {
            id: 3,
            name: 'Dr Edalin Hendry',
            image: 'https://randomuser.me/api/portraits/women/11.jpg',
            lastMessage: 'Prescription.doc',
            type: 'file',
            time: '10:20 PM',
            isPinned: true,
            isRead: true,
            online: true,
            active: true
        }
    ];

    const RECENT_CHATS = [
        {
            id: 4,
            name: 'Kelly Stevens',
            image: 'https://randomuser.me/api/portraits/women/65.jpg',
            lastMessage: 'Have you called them?',
            time: 'Just Now',
            unreadCount: 2,
            online: true
        },
        {
            id: 5,
            name: 'Robert Miller',
            image: 'https://randomuser.me/api/portraits/men/22.jpg',
            lastMessage: 'Video',
            type: 'video',
            time: 'Yesterday',
            isRead: true,
            online: true
        },
        {
            id: 6,
            name: 'Emily Musick',
            image: 'https://randomuser.me/api/portraits/women/33.jpg',
            lastMessage: 'Thanks for the help!',
            time: '10:20 PM',
            isRead: true,
            online: false
        }
    ];

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
            {/* Shared Sidebar */}
            <PatientSidebar activeSection="Message" />

            {/* Main Content Area */}
            <main className="flex-1 flex overflow-hidden p-4 lg:p-6 gap-6">

                {/* Left Panel: Chat List */}
                <div className="w-full lg:w-96 bg-white rounded-2xl flex flex-col shadow-sm border border-gray-100 h-full">

                    {/* Header & Search */}
                    <div className="p-6 pb-0">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-slate-900">All Chats</h2>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search"
                                className="pl-9 bg-gray-50 border-gray-100 focus:bg-white transition-colors"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer" />
                        </div>
                    </div>

                    {/* Online Now */}
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-gray-900">Online Now</h3>
                            <button className="text-xs text-blue-500 font-medium hover:underline">View All</button>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                            {ONLINE_USERS.map(user => (
                                <div key={user.id} className="relative flex-shrink-0">
                                    <Avatar className="w-12 h-12 border-2 border-white ring-2 ring-gray-50">
                                        <AvatarImage src={user.image} />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Lists */}
                    <div className="flex-1 overflow-y-auto px-4 space-y-6">
                        {/* Pinned Chats */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3 px-2">Pinned Chat</h3>
                            <div className="space-y-1">
                                {PINNED_CHATS.map(chat => (
                                    <div key={chat.id} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${chat.active ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                                        <div className="relative">
                                            <Avatar className="w-12 h-12">
                                                <AvatarImage src={chat.image} />
                                                <AvatarFallback>{chat.name[0]}</AvatarFallback>
                                            </Avatar>
                                            {chat.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-0.5">
                                                <h4 className="font-semibold text-gray-900 truncate">{chat.name}</h4>
                                                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{chat.time}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-gray-500 truncate flex items-center gap-1">
                                                    {chat.type === 'file' && <Paperclip className="w-3 h-3" />}
                                                    {chat.type === 'video' && <Play className="w-3 h-3" />}
                                                    {chat.lastMessage}
                                                </p>
                                                <div className="flex items-center gap-1">
                                                    {chat.isPinned && <span className="text-gray-400 rotate-45 select-none">📌</span>}
                                                    {chat.isRead ? <CheckCheck className="w-4 h-4 text-green-500" /> : <Check className="w-4 h-4 text-gray-300" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Chats */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3 px-2">Recent Chat</h3>
                            <div className="space-y-1">
                                {RECENT_CHATS.map(chat => (
                                    <div key={chat.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                        <div className="relative">
                                            <Avatar className="w-12 h-12">
                                                <AvatarImage src={chat.image} />
                                                <AvatarFallback>{chat.name[0]}</AvatarFallback>
                                            </Avatar>
                                            {chat.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-0.5">
                                                <h4 className="font-semibold text-gray-900 truncate">{chat.name}</h4>
                                                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{chat.time}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-gray-500 truncate flex items-center gap-1">
                                                    {chat.type === 'video' && <Play className="w-3 h-3" />}
                                                    {chat.lastMessage}
                                                </p>
                                                {chat.unreadCount ? (
                                                    <span className="bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                                        {chat.unreadCount}
                                                    </span>
                                                ) : (
                                                    <div className="flex items-center gap-1">
                                                        {chat.isRead ? <CheckCheck className="w-4 h-4 text-blue-500" /> : <Check className="w-4 h-4 text-gray-300" />}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Active Chat */}
                <div className="hidden lg:flex flex-1 bg-white rounded-2xl flex-col shadow-sm border border-gray-100 overflow-hidden">

                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src="https://randomuser.me/api/portraits/women/11.jpg" />
                                    <AvatarFallback>EH</AvatarFallback>
                                </Avatar>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Dr Edalin Hendry</h3>
                                <p className="text-sm text-green-500 font-medium">Online</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400">
                            <button className="p-2 hover:bg-gray-50 rounded-full"><Search className="w-5 h-5" /></button>
                            <button className="p-2 hover:bg-gray-50 rounded-full"><MoreVertical className="w-5 h-5" /></button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">

                        {/* Received Message */}
                        <div className="flex flex-row-reverse items-start gap-4">
                            <div className="flex items-end gap-2 text-xs text-gray-400 mb-1">
                                <span>Andrea Kearns</span>
                                <MoreHorizontal className="w-4 h-4" />
                            </div>
                            <Avatar className="w-8 h-8 self-end mb-5">
                                <AvatarImage src="https://randomuser.me/api/portraits/women/20.jpg" />
                            </Avatar>
                        </div>
                        {/* Actually, let's restructure to match the screenshot layout precisely */}
                        <div className="flex flex-col gap-8">

                            {/* Right: User Message */}
                            <div className="flex flex-row-reverse gap-3 group">
                                <Avatar className="w-10 h-10 mt-1">
                                    <AvatarImage src="https://randomuser.me/api/portraits/women/20.jpg" />
                                </Avatar>
                                <div className="max-w-[80%]">
                                    <div className="flex items-center justify-end gap-2 mb-1">
                                        <span className="text-sm font-semibold text-gray-700">Andrea Kearns</span>
                                        <MoreHorizontal className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                                    </div>
                                    <div className="bg-gray-100 rounded-2xl rounded-tr-none px-4 py-3 text-gray-700">
                                        <p>Hello Doctor, could you tell a diet plan that suits for me?</p>
                                    </div>
                                    <p className="text-xs text-right text-gray-400 mt-1">8:16 PM</p>
                                </div>
                            </div>

                            {/* Date Divider */}
                            <div className="flex justify-center">
                                <span className="bg-gray-100 px-4 py-1.5 rounded-full text-xs text-gray-500 font-medium">
                                    Today, March 25
                                </span>
                            </div>

                            {/* Left: Doctor Audio Message */}
                            <div className="flex gap-3 group">
                                <div className="relative">
                                    <Avatar className="w-10 h-10 mt-1">
                                        <AvatarImage src="https://randomuser.me/api/portraits/women/11.jpg" />
                                    </Avatar>
                                    {/* Small Green Dot on Avatar */}
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                </div>

                                <div className="max-w-[80%]">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-semibold text-gray-700">Edalin Hendry</span>
                                        <MoreHorizontal className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                                    </div>

                                    {/* Audio Message Bubble */}
                                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-none p-3 flex items-center gap-3 w-64">
                                        <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0 hover:bg-blue-700 transition-colors">
                                            <Play className="w-4 h-4 fill-white ml-0.5" />
                                        </button>
                                        <div className="flex-1 flex flex-col gap-1">
                                            {/* Audio Waveform Visualization Mockup */}
                                            <div className="flex items-center gap-0.5 h-6">
                                                {[3, 5, 3, 4, 6, 3, 5, 7, 4, 3, 2, 4, 6, 8, 5, 3, 4, 5, 3, 2].map((h, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-1 rounded-full ${i < 8 ? 'bg-blue-500' : 'bg-gray-200'}`}
                                                        style={{ height: `${h * 3}px` }}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500 font-medium">0:05</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-400 font-medium">
                                        <span>9:45 AM</span>
                                        <CheckCheck className="w-3.5 h-3.5 text-green-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Right: User Link Message */}
                            <div className="flex flex-row-reverse gap-3 group">
                                <Avatar className="w-10 h-10 mt-1">
                                    <AvatarImage src="https://randomuser.me/api/portraits/women/20.jpg" />
                                </Avatar>
                                <div className="max-w-[80%] sm:max-w-[60%]">
                                    <div className="flex items-center justify-end gap-2 mb-1">
                                        <span className="text-sm font-semibold text-gray-700">Andrea Kearns</span>
                                        <MoreHorizontal className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                                    </div>

                                    {/* Link Preview Card */}
                                    <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tr-none overflow-hidden">
                                        <div className="p-3 pb-2">
                                            <a href="#" className="text-blue-500 text-sm hover:underline truncate block">
                                                https://www.youtube.com/watch?v=GCmL3mS0Psk
                                            </a>
                                        </div>
                                        <div className="relative aspect-video bg-black group-hover:opacity-95 transition-opacity cursor-pointer">
                                            <img
                                                src="https://img.freepik.com/free-photo/healthy-lifestyle-diet-nutrition-concept_53876-125205.jpg"
                                                alt="Diet Plan Video"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                    <Play className="w-5 h-5 text-white fill-white ml-1" />
                                                </div>
                                            </div>
                                            {/* Overlay Text Mockup */}
                                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-3 rounded-lg -rotate-2 transform shadow-lg">
                                                <div className="text-center">
                                                    <p className="font-bold text-gray-800 text-lg">DIET</p>
                                                </div>
                                            </div>
                                            <div className="absolute top-4 right-4 rotate-12 bg-white p-2 shadow-lg">
                                                <div className="text-center w-24">
                                                    <p className="font-bold text-red-500">APPLE</p>
                                                    <p className="text-[10px] text-gray-500">CARROT JUICE</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end gap-1 mt-1 text-xs text-gray-400 font-medium">
                                        <span>9:47 AM</span>
                                    </div>
                                </div>
                            </div>

                            {/* Left: Typing Indicator */}
                            <div className="flex gap-3">
                                <Avatar className="w-8 h-8 mt-1">
                                    <AvatarImage src="https://randomuser.me/api/portraits/women/11.jpg" />
                                </Avatar>
                                <div className="bg-gray-100 rounded-full px-4 py-2 flex gap-1 items-center h-10">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1 text-gray-400">
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><MoreVertical className="w-5 h-5 rotate-90" /></button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Smile className="w-5 h-5" /></button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Mic className="w-5 h-5" /></button>
                            </div>
                            <div className="flex-1">
                                <Input
                                    placeholder="Type your message here..."
                                    className="bg-gray-50 border-gray-100 focus:bg-white transition-colors h-11"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                />
                            </div>
                            <Button className="bg-blue-500 hover:bg-blue-600 w-11 h-11 rounded-lg p-0 flex items-center justify-center shadow-md">
                                <Send className="w-5 h-5 text-white ml-0.5" />
                            </Button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default PatientMessages;
