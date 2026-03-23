import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight, Sparkles, Database, Layout, ShieldCheck, Zap } from "lucide-react";

export default async function Home() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 overflow-hidden flex justify-center pointer-events-none z-0">
        <div className="w-[1000px] h-[500px] opacity-30 bg-indigo-600 rounded-full blur-[120px] mix-blend-screen mix-blend-lighten translate-y-[-50%]"></div>
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] opacity-20 bg-purple-600 rounded-full blur-[100px] mix-blend-screen mix-blend-lighten"></div>
      </div>

      <main className="relative z-10 container mx-auto px-4 pt-32 pb-20 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm animate-fade-in">
          <Sparkles size={16} className="text-indigo-400" />
          <span>Thế hệ AI mới nhất đã ra mắt</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-400 drop-shadow-sm max-w-4xl leading-tight">
          AI TAMIL Company
        </h1>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Nền tảng AI SaaS tối thượng dành cho doanh nghiệp và nhà phát triển. 
          Khởi tạo <span className="font-semibold text-white">tính năng</span>, 
          thiết kế <span className="font-semibold text-white">cơ sở dữ liệu</span>, và xây dựng 
          <span className="font-semibold text-white"> giao diện</span> hoàn mỹ chỉ trong vài giây.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto sm:max-w-none">
          {user ? (
            <Link 
              href="/dashboard"
              className="group relative inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.7)] hover:-translate-y-1"
            >
              Đi đến Bảng điều khiển
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <>
              <Link 
                href="/register"
                className="group relative inline-flex items-center justify-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-indigo-50 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Tạo tài khoản miễn phí
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/login"
                className="inline-flex items-center justify-center border border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-800 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                Đăng nhập
              </Link>
            </>
          )}
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-5xl w-full text-left">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 rounded-3xl hover:border-indigo-500/50 transition-colors duration-300">
            <div className="bg-indigo-500/20 w-14 h-14 flex items-center justify-center rounded-2xl mb-6 text-indigo-400">
              <Layout size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Tạo giao diện UI/UX</h3>
            <p className="text-slate-400 leading-relaxed">Sinh ra các thành phần giao diện hiện đại, chuyên nghiệp chỉ với một lời nhắc đơn giản.</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 rounded-3xl hover:border-purple-500/50 transition-colors duration-300">
            <div className="bg-purple-500/20 w-14 h-14 flex items-center justify-center rounded-2xl mb-6 text-purple-400">
              <Database size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Sơ đồ Cơ sở dữ liệu</h3>
            <p className="text-slate-400 leading-relaxed">Phân tích yêu cầu và tự động thiết kế kiến trúc DB tối ưu, mở rộng dễ dàng.</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 rounded-3xl hover:border-emerald-500/50 transition-colors duration-300">
            <div className="bg-emerald-500/20 w-14 h-14 flex items-center justify-center rounded-2xl mb-6 text-emerald-400">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Tốc độ chớp nhoáng</h3>
            <p className="text-slate-400 leading-relaxed">Nhận ngay toàn bộ mã nguồn Next.js & Supabase sẵn sàng triển khai thực tế.</p>
          </div>
        </div>

      </main>
    </div>
  );
}
