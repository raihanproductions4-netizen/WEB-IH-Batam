import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, X, Send, Sparkles, HelpCircle, Calendar, GraduationCap } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { schoolProfile, generateWhatsAppUrl } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickQuestions = [
    {
      title: 'Info PPDB 2026/2027',
      desc: 'Tanya syarat, alur, & kuota pendaftaran',
      icon: GraduationCap,
      message: 'Assalamu\'alaikum Panitia PPDB Insan Harapan Batam, saya ingin berkonsultasi mengenai pendaftaran santri baru tahun ajaran 2026/2027. Mohon informasinya. Terima kasih.'
    },
    {
      title: 'Rincian Biaya & Infaq',
      desc: 'Informasi biaya masuk dan SPP bulanan',
      icon: HelpCircle,
      message: 'Assalamu\'alaikum Admin Insan Harapan Batam, mohon info rincian biaya pendaftaran, uang gedung, serta SPP untuk unit (RAIT/SDIT/SMPIT). Terima kasih.'
    },
    {
      title: 'Jadwal Survei & Open House',
      desc: 'Rencanakan kunjungan ke kampus sekolah',
      icon: Calendar,
      message: 'Assalamu\'alaikum Humas Insan Harapan Batam, saya orang tua calon siswa ingin menjadwalkan kunjungan survei sekolah / observasi langsung ke kampus. Kapan waktu yang tersedia? Terima kasih.'
    }
  ];

  const unitContacts = [
    { name: 'SDIT Insan Harapan', number: '6281275426729', display: '0812-7542-6729', badge: 'SD' },
    { name: 'SA SMPIT Insan Harapan', number: '6281261189139', display: '0812-6118-9139', badge: 'SMP' },
    { name: 'RAIT Insan Harapan', number: '6282197028895', display: '0821-9702-8895', badge: 'TK' },
  ];

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const url = generateWhatsAppUrl(customMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
    setCustomMsg('');
    setIsOpen(false);
  };

  const handleQuickSend = (msg: string, phone?: string) => {
    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
      : generateWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Dialog Box */}
      {isOpen && (
        <div className="mb-3 w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center border border-emerald-400">
                  <MessageCircle className="w-5 h-5 text-orange-300" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Konsultasi Resmi Insan Harapan</h4>
                  <p className="text-xs text-orange-200">Tembesi, Sagulung · Batam</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-emerald-200 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-emerald-100 mt-2 leading-relaxed bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-600/40">
              Assalamu'alaikum Ayah & Bunda! Silakan pilih nomor unit atau topik pertanyaan di bawah ini.
            </p>
          </div>

          {/* Direct Unit Contacts */}
          <div className="p-3 bg-emerald-50/60 border-b border-emerald-100 space-y-2">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider px-1 block">
              Pilih WhatsApp Unit:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {unitContacts.map((u, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickSend(`Assalamu'alaikum Admin ${u.name}, saya ingin berkonsultasi mengenai pendaftaran santri baru.`, u.number)}
                  className="p-2 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-xl text-center transition-all group shadow-xs"
                >
                  <span className="block font-bold text-[11px] text-emerald-800 group-hover:text-emerald-950">
                    {u.badge}
                  </span>
                  <span className="block text-[9px] text-stone-500 font-mono">
                    {u.display.split('-')[1]}...
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick options */}
          <div className="p-3 bg-stone-50 space-y-2 max-h-[190px] overflow-y-auto">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider px-1">
              Topik Populer
            </span>
            {quickQuestions.map((q, idx) => {
              const IconComp = q.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleQuickSend(q.message)}
                  className="w-full text-left p-2.5 bg-white hover:bg-emerald-50/70 border border-stone-200 hover:border-emerald-300 rounded-xl transition-all flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors">
                      {q.title}
                    </div>
                    <div className="text-[11px] text-stone-500 truncate">{q.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom message input form */}
          <form onSubmit={handleSendCustom} className="p-3 bg-white border-t border-stone-200 flex gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Ketik pesan untuk Admin..."
              className="flex-1 text-xs px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-medium flex items-center gap-1 shrink-0 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full shadow-lg shadow-emerald-950/20 transition-all font-medium text-sm"
        aria-label="Hubungi WhatsApp Sekolah"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="hidden sm:inline font-semibold">Tanya PPDB WhatsApp</span>
        <span className="sm:hidden font-semibold">WhatsApp</span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500"></span>
          </span>
        )}
      </button>
    </div>
  );
};
