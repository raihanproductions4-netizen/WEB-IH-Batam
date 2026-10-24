import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EducationalUnitType } from '../types';
import {
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Download,
  MessageCircle,
  ArrowRight,
  Target,
  FileCheck,
  MapPin,
  Phone,
  Mail,
  Trophy,
  Award,
  Camera,
  ZoomIn,
  X,
  Medal,
  Calendar
} from 'lucide-react';

export const UnitsView: React.FC = () => {
  const { units, selectedUnitId, setSelectedUnitId, setActiveTab, generateWhatsAppUrl, showToast } = useApp();
  const [downloadModalUnit, setDownloadModalUnit] = useState<string | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'activities' | 'achievements'>('all');
  const [previewMedia, setPreviewMedia] = useState<{
    url: string;
    title: string;
    category?: string;
    tag?: string;
    date?: string;
    description: string;
    winnerName?: string;
    rank?: string;
    level?: string;
  } | null>(null);

  const currentUnit = units.find((u) => u.id === selectedUnitId) || units[1]; // default SDIT

  const handleDownloadBrochure = (unitName: string) => {
    // Generate brochure dialog
    setDownloadModalUnit(unitName);
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <span>Unit Pendidikan Terpadu</span>
            <span aria-hidden="true">·</span>
            <span>Insan Harapan Batam</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            Eksplorasi Kurikulum & Jenjang Pendidikan
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Pilihlah jenjang pendidikan yang sesuai dengan tahap tumbuh kembang ananda untuk melihat kurikulum, jadwal harian, dan target capaian lulusan.
          </p>
        </div>

        {/* Unit Selector Segmented Control (Tabs) */}
        <div className="flex justify-center">
          <div className="p-1.5 bg-stone-200/80 rounded-2xl flex flex-wrap sm:flex-nowrap gap-1.5 shadow-inner max-w-xl w-full">
            {units.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setSelectedUnitId(unit.id)}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex flex-col items-center justify-center gap-0.5 ${
                  selectedUnitId === unit.id
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                <span>{unit.name}</span>
                <span className={`text-[10px] ${selectedUnitId === unit.id ? 'text-orange-200 font-medium' : 'text-stone-500'}`}>
                  {unit.id === 'rait' ? 'PAUD/TK IT' : unit.id === 'sdit' ? 'Sekolah Dasar' : 'SA SMPIT'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Unit Detailed Showcase Card */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          {/* Unit Hero Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch border-b border-stone-200">
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-3">
                  <span>{currentUnit.fullName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded-md">{currentUnit.ageRange}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4">
                  {currentUnit.name}
                </h2>
                <p className="text-base font-semibold text-emerald-700 mb-4 italic">
                  "{currentUnit.tagline}"
                </p>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  {currentUnit.description}
                </p>

                {/* Key Highlights with Fresh Light Green Checkmarks */}
                <div className="space-y-2.5 mb-6">
                  {currentUnit.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Unit Specific Campus & Legal Details Box */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs space-y-2 text-stone-700">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <span className="font-bold text-stone-900">{currentUnit.name}</span>
                    {currentUnit.npsn && (
                      <span className="font-mono text-[11px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                        NPSN: {currentUnit.npsn}
                      </span>
                    )}
                  </div>
                  {currentUnit.address && (
                    <div className="flex items-start gap-2 pt-1 text-stone-600">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed"><strong>Alamat:</strong> {currentUnit.address}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-stone-600 pt-1">
                    {currentUnit.phone && (
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span><strong>Kontak:</strong> {currentUnit.phone}</span>
                      </span>
                    )}
                    {currentUnit.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-emerald-600" />
                        <span><strong>Email:</strong> {currentUnit.email}</span>
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-stone-500 pt-1">
                    Naungan: <strong>{currentUnit.foundation || 'Yayasan Harapan Ibu Kepri'}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedUnitId(currentUnit.id);
                    setActiveTab('ppdb');
                  }}
                  className="px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-[0.98] text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-orange-500/25 flex items-center gap-2 border border-orange-400/40"
                >
                  <Sparkles className="w-4 h-4 text-emerald-100" />
                  <span>Daftar {currentUnit.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${currentUnit.whatsapp ? (currentUnit.whatsapp.startsWith('62') ? currentUnit.whatsapp : '62' + currentUnit.whatsapp.replace(/^0/, '')) : '6281275426729'}?text=${encodeURIComponent(`Assalamu'alaikum Admin ${currentUnit.name}, saya ingin bertanya rincian informasi dan syarat pendaftaran.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat WhatsApp Unit</span>
                </a>

                <button
                  onClick={() => handleDownloadBrochure(currentUnit.name)}
                  className="px-4 py-3 bg-white hover:bg-stone-50 text-stone-700 font-medium rounded-xl text-xs sm:text-sm border border-stone-300 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-stone-500" />
                  <span>Unduh Brosur & Kurikulum</span>
                </button>
              </div>
            </div>

            {/* Photo Column */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-stone-100">
              <img
                src={currentUnit.image}
                alt={currentUnit.fullName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs bg-emerald-700/90 backdrop-blur-sm px-2.5 py-1 rounded-md font-semibold">
                  Dokumentasi Autentik
                </span>
                <p className="text-xs mt-2 text-stone-200">
                  Aktivitas belajar nyata santri di lingkungan SIT Insan Harapan Batam.
                </p>
              </div>
            </div>
          </div>

          {/* Curriculum & Daily Routine Columns */}
          <div className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 bg-stone-50/50">
            {/* Left: Kurikulum & Pendekatan */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-bold text-stone-900">
                  Struktur Kurikulum & Metode Belajar
                </h3>
              </div>

              <div className="space-y-4">
                {currentUnit.curriculum.map((curr, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                    <h4 className="font-bold text-sm text-emerald-900 mb-1.5">
                      {curr.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {curr.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Daily Routine Timeline */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-bold text-stone-900">
                  Jadwal & Rutinitas Pembiasaan Harian
                </h3>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4 shadow-xs">
                {currentUnit.dailyRoutine.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 pb-3 border-b border-stone-100 last:border-b-0 last:pb-0">
                    <span className="font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md shrink-0">
                      {item.time}
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {item.activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Target Capaian & Standar Lulusan */}
          <div className="p-8 sm:p-12 border-t border-stone-200 bg-emerald-900 text-white">
            <div className="max-w-3xl mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800 text-amber-300 rounded-lg text-xs font-semibold mb-2">
                <Target className="w-4 h-4" />
                <span>Standar Mutu Lulusan</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Target Capaian Santri {currentUnit.name}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                Setiap santri didampingi hingga mencapai indikator kelulusan yang telah divalidasi oleh dewan asatidz dan standar JSIT:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentUnit.targetCompetencies.map((comp, idx) => (
                <div key={idx} className="bg-emerald-800/80 border border-emerald-700/60 p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm text-stone-100">
                  <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{comp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Foto Kegiatan Santri & Panggung Prestasi */}
          <div className="p-8 sm:p-12 border-t border-stone-200 bg-white space-y-10">
            {/* Header & Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold mb-2">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Dokumentasi Autentik & Prestasi</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                  Foto Kegiatan Santri & Prestasi Juara {currentUnit.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Potret pembiasaan ibadah, belajar di alam terbuka, praktikum teknologi, dan panggung kejuaraan santri.
                </p>
              </div>

              {/* Segmented Filter */}
              <div className="flex p-1 bg-stone-100 rounded-xl text-xs font-semibold self-start sm:self-auto border border-stone-200">
                <button
                  onClick={() => setGalleryFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    galleryFilter === 'all' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setGalleryFilter('activities')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    galleryFilter === 'activities' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Kegiatan ({currentUnit.activities?.length || 0})</span>
                </button>
                <button
                  onClick={() => setGalleryFilter('achievements')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                    galleryFilter === 'achievements' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>Prestasi ({currentUnit.achievements?.length || 0})</span>
                </button>
              </div>
            </div>

            {/* Sub-Section 1: Foto Kegiatan Anak-Anak */}
            {(galleryFilter === 'all' || galleryFilter === 'activities') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-stone-900">
                        Foto Kegiatan Belajar & Karakter Anak
                      </h4>
                      <p className="text-xs text-stone-500">
                        Aktivitas nyata harian santri di {currentUnit.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentUnit.activities && currentUnit.activities.map((act) => (
                    <div
                      key={act.id}
                      className="group bg-stone-50 rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                    >
                      <div className="relative h-48 overflow-hidden bg-stone-200">
                        <img
                          src={act.image}
                          alt={act.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                        <span className="absolute top-3 left-3 bg-emerald-700/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {act.tag}
                        </span>
                        <button
                          onClick={() => setPreviewMedia({
                            url: act.image,
                            title: act.title,
                            category: act.category,
                            tag: act.tag,
                            date: act.date,
                            description: act.description
                          })}
                          className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-stone-900 rounded-lg text-xs font-semibold shadow-sm transition-transform active:scale-95 flex items-center gap-1 cursor-pointer"
                        >
                          <ZoomIn className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="text-[11px]">Perbesar</span>
                        </button>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
                            <span className="text-emerald-700 font-semibold">{act.category}</span>
                            <span>{act.date}</span>
                          </div>
                          <h5 className="font-bold text-sm text-stone-900 leading-snug mb-2 group-hover:text-emerald-800 transition-colors">
                            {act.title}
                          </h5>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {act.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-Section 2: Panggung Prestasi & Kejuaraan */}
            {(galleryFilter === 'all' || galleryFilter === 'achievements') && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-stone-900">
                        Prestasi & Penghargaan Santri Juara
                      </h4>
                      <p className="text-xs text-stone-500">
                        Capaian kompetisi akademik, tahfiz Al-Qur'an, sains, dan robotika
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentUnit.achievements && currentUnit.achievements.map((ach) => (
                    <div
                      key={ach.id}
                      className="bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/40 rounded-2xl border-2 border-amber-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-start"
                    >
                      <div className="relative w-full sm:w-44 h-44 rounded-xl overflow-hidden bg-stone-200 shrink-0 group">
                        <img
                          src={ach.image}
                          alt={ach.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          onClick={() => setPreviewMedia({
                            url: ach.image,
                            title: ach.title,
                            winnerName: ach.winnerName,
                            rank: ach.rank,
                            level: ach.level,
                            date: ach.year,
                            description: ach.description
                          })}
                          className="absolute inset-0 bg-stone-950/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold gap-1.5 transition-opacity cursor-pointer"
                        >
                          <ZoomIn className="w-4 h-4" />
                          <span>Lihat Bukti Foto</span>
                        </button>
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-extrabold text-[11px] shadow-xs">
                            <Trophy className="w-3 h-3 text-stone-950" />
                            <span>{ach.rank}</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold text-[10px]">
                            {ach.level}
                          </span>
                          <span className="text-[11px] text-stone-400 font-mono">
                            {ach.year}
                          </span>
                        </div>

                        <h5 className="font-extrabold text-stone-900 text-sm leading-snug">
                          {ach.title}
                        </h5>

                        <div className="p-2.5 rounded-xl bg-white/80 border border-amber-100 text-xs text-stone-700">
                          <p className="font-bold text-emerald-900">{ach.winnerName}</p>
                          <p className="text-[11px] text-stone-500">{ach.competition}</p>
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed">
                          {ach.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lightbox Preview Modal */}
        {previewMedia && (
          <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden border border-stone-200 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="relative max-h-[60vh] bg-stone-900 flex items-center justify-center overflow-hidden">
                <img
                  src={previewMedia.url}
                  alt={previewMedia.title}
                  className="w-full h-full object-contain max-h-[60vh]"
                />
                <button
                  onClick={() => setPreviewMedia(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  {previewMedia.rank && (
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-stone-950 font-bold text-xs">
                      🏆 {previewMedia.rank}
                    </span>
                  )}
                  {previewMedia.tag && (
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold text-xs">
                      {previewMedia.tag}
                    </span>
                  )}
                  {previewMedia.date && (
                    <span className="text-xs text-stone-500">
                      {previewMedia.date}
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-lg text-stone-900">
                  {previewMedia.title}
                </h4>

                {previewMedia.winnerName && (
                  <p className="text-xs font-semibold text-emerald-800">
                    Penerima: {previewMedia.winnerName}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {previewMedia.description}
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setPreviewMedia(null)}
                    className="px-5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Unduh Brosur Interaktif */}
        {downloadModalUnit && (
          <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-stone-200 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  Brosur & Panduan Silabus {downloadModalUnit}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Dokumen panduan resmi berisi kurikulum terintegrasi, kalender akademik, biaya rincian, dan tata tertib santri SIT Insan Harapan Batam.
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                <p><strong>Format:</strong> Digital PDF Guidebook (T.A. 2026/2027)</p>
                <p><strong>Penerbit:</strong> Divisi Kurikulum Insan Harapan Batam</p>
                <p><strong>Status:</strong> Edisi Terverifikasi</p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    showToast(`Brosur resmi ${downloadModalUnit} siap diunduh! Silakan hubungi admin untuk versi cetak lengkap.`, 'success');
                    setDownloadModalUnit(null);
                  }}
                  className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Simpan Panduan</span>
                </button>
                <button
                  onClick={() => setDownloadModalUnit(null)}
                  className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
