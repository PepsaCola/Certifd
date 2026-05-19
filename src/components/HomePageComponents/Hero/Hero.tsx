import Link from 'next/link';

export const Hero = () => {
    return (
        <section className="relative bg-brand-dark bg-[url('/img/hero.png')] bg-cover bg-center pt-[82px] pb-0 overflow-hidden">
            <div className="relative z-20 flex flex-col items-center text-brand-white">

                <div className="w-full border-t border-brand-white/25">
                    <div className="flex flex-col items-start max-w-[1080px] px-4 sm:px-8 md:px-[80px] py-10 md:py-[48px] border-x border-brand-white/25 mx-auto">

                        <div className="flex flex-wrap items-center gap-2 border border-brand-accent/30 bg-brand-accent/10 text-brand-accent-text px-3 py-1.5 md:px-[17px] md:py-[5px] text-[10px] md:text-xs mb-6 font-sans font-normal w-fit">
                            <span className="w-1.5 h-1.5 bg-brand-accent rounded-full shrink-0"></span>
                            W3C Verifiable Credentials • Open Standards • Cryptographic Trust
                        </div>

                        <h1 className="text-left font-serif text-4xl sm:text-5xl md:text-[58px] font-bold mb-6 leading-tight md:leading-[1.1]">
                            Issue and verify digital certificates with trust
                        </h1>

                        <p className="text-left font-sans text-[15px] md:text-base font-normal mb-8 text-brand-white/80 max-w-2xl">
                            A workspace to research, enrich, and act on your data all at once.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                href="/certificates?tab=issue"
                                className="bg-brand-btn hover:bg-brand-btn/90 text-brand-white text-[15px] font-medium px-[24px] py-[12px] transition-colors text-center "
                            >
                                Issue Certificates
                            </Link>
                            <Link
                                href="/certificates?tab=verify"
                                className="border border-brand-white/40 hover:bg-white/10 text-brand-white text-[15px] font-medium px-[24px] py-[12px] transition-colors text-center "
                            >
                                Verify Certificate
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="w-full border-t border-brand-white/25">
                    <div className="max-w-[1080px] mx-auto border-x border-brand-white/25 px-4 sm:px-8 md:px-[32px] pt-6 md:pt-[28px]">
                        <img
                            src="/img/hero-add-img.png"
                            alt="Certifd Dashboard"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};