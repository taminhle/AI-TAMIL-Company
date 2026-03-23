import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, KeyRound, UserPlus } from 'lucide-react'

export default function Register({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signUp = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {}
    })

    if (error) {
      return redirect('/register?message=Không thể xác thực người dùng')
    }

    return redirect('/login?message=Đã tạo tài khoản! Vui lòng đăng nhập.')
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[600px] opacity-20 bg-emerald-600 rounded-full blur-[120px] mix-blend-screen translate-x-[-50%] translate-y-[-50%] pointer-events-none"></div>

      <div className="relative w-full max-w-md z-10">
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8 text-sm font-medium group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Quay lại Trang chủ
        </Link>
        
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Tạo tài khoản</h1>
            <p className="text-slate-400">Tham gia hệ sinh thái AI TAMIL</p>
          </div>

          <form className="flex flex-col gap-5" action={signUp}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1" htmlFor="email">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-500" />
                </div>
                <input
                  id="email"
                  className="w-full rounded-xl pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-white placeholder-slate-500 outline-none"
                  name="email"
                  placeholder="ban@vd.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1" htmlFor="password">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound size={18} className="text-slate-500" />
                </div>
                <input
                  id="password"
                  className="w-full rounded-xl pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-white placeholder-slate-500 outline-none"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-4 py-3.5 mt-2 font-semibold transition-all duration-300 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.7)] hover:-translate-y-0.5">
              <UserPlus size={18} /> Đăng ký thành viên
            </button>

            {searchParams?.message && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-center">
                {searchParams.message}
              </div>
            )}
          </form>

          <p className="text-center text-sm text-slate-400 mt-8">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
