import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircle, MessageSquare, LogOut, LayoutGrid, Sparkles } from "lucide-react";
import { createProject, signOut } from "./actions";

export default async function Dashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans selection:bg-indigo-500/30">
      
      {/* Top Header */}
      <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/25 transition-all">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-100 group-hover:text-indigo-400 transition-colors">AI TAMIL</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <span className="text-slate-400 hidden sm:inline-block border border-slate-800 bg-slate-900/50 px-3 py-1.5 rounded-full">{user.email}</span>
          <form action={signOut}>
            <button className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1.5 font-medium">
              <LogOut size={16} /> <span className="hidden sm:inline-block">Đăng xuất</span>
            </button>
          </form>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full relative">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight flex items-center gap-3">
              <LayoutGrid className="text-indigo-400" size={32} /> Dự án của bạn
            </h1>
            <p className="text-slate-400 text-lg">Quản lý và phác thảo các ứng dụng bằng sức mạnh AI.</p>
          </div>
          
          <form action={createProject} className="flex gap-2 w-full md:w-auto bg-slate-900/50 p-1.5 rounded-xl border border-slate-800 backdrop-blur-sm">
            <input 
              type="text" 
              name="name" 
              placeholder="Tên dự án mới..." 
              required 
              className="bg-transparent border-none px-4 py-2 text-sm flex-1 focus:outline-none focus:ring-0 text-white placeholder-slate-500 min-w-[200px]"
            />
            <button 
              type="submit" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 text-sm font-semibold shadow-[0_0_15px_-3px_rgba(79,70,229,0.4)]"
            >
              <PlusCircle size={18} /> Tạo mới
            </button>
          </form>
        </div>

        {projects?.length === 0 ? (
          <div className="relative z-10 text-center py-24 bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-dashed border-slate-700">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-6 border border-indigo-500/20 shadow-[0_0_30px_-5px_rgba(79,70,229,0.15)]">
              <PlusCircle size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Chưa có dự án nào</h3>
            <p className="text-slate-400 max-w-md mx-auto leading-relaxed text-lg">
              Tạo dự án đầu tiên của bạn để khám phá quyền năng sinh giao diện, tính năng và cơ sở dữ liệu từ AI.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {projects?.map((project) => (
              <div key={project.id} className="group relative bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-[0_8px_30px_-12px_rgba(79,70,229,0.3)] hover:-translate-y-1">
                {/* Card Glow Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="flex-1 relative z-10">
                  <h3 className="text-xl font-bold mb-2 text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1" title={project.name}>
                    {project.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-8 font-medium">
                    Đã tạo: <span className="text-slate-400">{new Date(project.created_at).toLocaleDateString()}</span>
                  </p>
                </div>
                
                <Link 
                  href={`/chat?projectId=${project.id}`}
                  className="relative z-10 w-full bg-slate-800/80 hover:bg-indigo-600 text-slate-300 hover:text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 border border-slate-700 hover:border-indigo-500 shadow-sm"
                >
                  <MessageSquare size={18} /> Mở Chat AI
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
