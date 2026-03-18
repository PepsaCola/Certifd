export const VerifyContent = () => {
    return (
        <section className="min-h-screen bg-[#F8F9FA] flex flex-col items-center ">
            <div className='max-w-[880px] w-full pt-[48px] pb-[100px]'>
                <div className=" mb-10">
                    <h1 className="font-serif text-[24px] text-brand-dark mb-3">
                        Verify a Certificate
                    </h1>
                    <p className="font-sans text-[14px] text-brand-secondary">
                        Instantly verify any credential issued through Certifd
                    </p>
                </div>
                <div className="w-full  bg-white border border-neutral-200/80  p-6 sm:p-10 mb-12">
                    <div
                        className="border-2 border-dashed border-[#A8C5DA] bg-[#F8FAFC]/50 rounded-sm p-10 flex flex-col items-center text-center mb-8">

                        <div className="flex gap-4 mb-6">
                            <img src="/icons/pdf.svg" alt=""/>
                            <img src="/icons/json.svg" alt=""/>
                            <img src="/icons/vc.svg" alt=""/>
                        </div>

                        <p className="text-sm text-brand-dark font-medium mb-1">
                            Drag and drop a credential file here
                        </p>
                        <p className="text-sm text-brand-secondary mb-8">
                            or <button className="underline hover:text-brand-dark transition-colors">click to
                            browse</button>
                        </p>

                        <div className="flex flex-col items-center">
                        <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest mb-3">
                            Support:
                        </span>
                            <div className="flex gap-2">
                                <span
                                    className="border border-neutral-200 text-brand-secondary text-xs px-2 py-1 rounded-sm">.pdf</span>
                                <span
                                    className="border border-neutral-200 text-brand-secondary text-xs px-2 py-1 rounded-sm">.json</span>
                                <span
                                    className="border border-neutral-200 text-brand-secondary text-xs px-2 py-1 rounded-sm">.vc</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex-1 h-px bg-neutral-200"></div>
                        <span className="text-sm text-brand-secondary">or</span>
                        <div className="flex-1 h-px bg-neutral-200"></div>
                    </div>

                    <button
                        className="w-full flex items-center justify-between border border-neutral-200 hover:border-brand-accent hover:shadow-sm transition-all p-4 rounded-sm group text-left">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-10 h-10 bg-[#F0F5FA] text-[#3B82F6] flex items-center justify-center rounded-sm">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-brand-dark font-semibold text-sm">Scan QR Code</h4>
                                <p className="text-brand-secondary text-xs">Use your camera to scan the QR code on a
                                    certificate.</p>
                            </div>
                        </div>
                        <span className="text-neutral-400 group-hover:text-brand-dark transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2">
                            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    </button>

                </div>


            </div>
            <div className="flex items-center align-bottom gap-2 text-[11px] text-brand-secondary/70 max-w-[880px] w-full text-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>All credentials are issued as W3C Verifiable Credentials (VC) and stored on a tamper-evident ledger. Certifd complies with ISO/IEC 18013-5 and GDPR.</span>
            </div>
        </section>
    );
};