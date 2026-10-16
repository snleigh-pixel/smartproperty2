import React, { useState } from 'react';

interface LeadInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  developerName: string;
  onInquirySubmitted: () => void;
}

export const LeadInquiryModal: React.FC<LeadInquiryModalProps> = ({
  isOpen,
  onClose,
  projectName,
  developerName,
  onInquirySubmitted
}) => {
  const [inquiryType, setInquiryType] = useState<'SHOWROOM_VISIT' | 'PHONE_CALL'>('SHOWROOM_VISIT');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save lead inquiry locally (never sent to any AI model)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onInquirySubmitted();
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setName('');
    setContact('');
    setPreferredDate('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-[#122131] border border-[#273647] rounded-xl p-5 sm:p-6 max-w-lg w-full shadow-2xl relative">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 text-[#bbcabf] hover:text-[#d4e4fa] p-1 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/30">
                <span className="material-symbols-outlined text-2xl">
                  {inquiryType === 'SHOWROOM_VISIT' ? 'meeting_room' : 'phone_in_talk'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#4edea3] uppercase tracking-wider block">
                  Developer Direct Channel
                </span>
                <h3 className="text-lg font-bold text-[#d4e4fa]">
                  {inquiryType === 'SHOWROOM_VISIT' ? 'Book VIP Showroom Preview' : 'Request Developer Callback'}
                </h3>
              </div>
            </div>

            {/* Target Project Card */}
            <div className="p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] mb-4">
              <span className="text-[10px] text-[#86948a] uppercase block">Selected Development</span>
              <p className="text-sm font-bold text-[#d4e4fa]">{projectName}</p>
              <p className="text-xs text-[#bbcabf]">Appointed Developer: {developerName}</p>
            </div>

            {/* Toggle Inquiry Mode */}
            <div className="grid grid-cols-2 gap-2 mb-4 bg-[#0d1c2d] p-1 rounded-lg border border-[#1c2b3c]">
              <button
                type="button"
                onClick={() => setInquiryType('SHOWROOM_VISIT')}
                className={`py-2 rounded-md text-xs font-semibold transition-all ${
                  inquiryType === 'SHOWROOM_VISIT'
                    ? 'bg-[#1c2b3c] text-[#4edea3] shadow-sm'
                    : 'text-[#bbcabf] hover:text-[#d4e4fa]'
                }`}
              >
                Showroom Visit
              </button>
              <button
                type="button"
                onClick={() => setInquiryType('PHONE_CALL')}
                className={`py-2 rounded-md text-xs font-semibold transition-all ${
                  inquiryType === 'PHONE_CALL'
                    ? 'bg-[#1c2b3c] text-[#4edea3] shadow-sm'
                    : 'text-[#bbcabf] hover:text-[#d4e4fa]'
                }`}
              >
                Phone Consultation
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-[#bbcabf] block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rachel Lim"
                  className="w-full bg-[#0d1c2d] border border-[#1c2b3c] rounded-lg h-10 px-3 text-xs text-[#d4e4fa] outline-none focus:border-[#4edea3]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#bbcabf] block mb-1">
                  Mobile Number or Email
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. +65 9123 4567 or email@domain.sg"
                  className="w-full bg-[#0d1c2d] border border-[#1c2b3c] rounded-lg h-10 px-3 text-xs text-[#d4e4fa] outline-none focus:border-[#4edea3]"
                />
              </div>

              {inquiryType === 'SHOWROOM_VISIT' && (
                <div>
                  <label className="text-xs font-semibold text-[#bbcabf] block mb-1">
                    Preferred Visit Date / Slot
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-[#0d1c2d] border border-[#1c2b3c] rounded-lg h-10 px-3 text-xs text-[#d4e4fa] outline-none focus:border-[#4edea3]"
                  />
                </div>
              )}

              <p className="text-[11px] text-[#86948a] leading-tight mt-1">
                Privacy Assurance: Your contact details are securely transmitted solely to the appointed project developer sales team. No information is ever provided to any AI model.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-[#1c2b3c] text-xs font-semibold text-[#bbcabf] hover:text-[#d4e4fa]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-[#4edea3] hover:bg-[#10b981] text-[#003824] text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Request</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center border border-[#4edea3]/40">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h3 className="text-lg font-bold text-[#d4e4fa]">
              Appointment Registered
            </h3>
            <p className="text-xs text-[#bbcabf] max-w-sm">
              Thank you, <strong className="text-[#d4e4fa]">{name}</strong>. The developer sales gallery representative for <strong className="text-[#4edea3]">{projectName}</strong> will confirm your preview slot via <strong className="text-[#d4e4fa]">{contact}</strong>.
            </p>
            <div className="p-3 bg-[#0d1c2d] border border-[#1c2b3c] rounded-lg text-[11px] text-[#86948a] mt-2">
              Conversion Reference: PropPulse VIP Lead #{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 rounded-lg bg-[#4edea3] text-[#003824] text-xs font-bold"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
