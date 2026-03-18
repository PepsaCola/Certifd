import Link from 'next/link';

export const Hero = () => {
    return (
        <section
            className="relative  bg-brand-dark bg-[url('/img/hero.png')] bg-cover bg-center pt-[82px] pb-0 overflow-hidden"
        >
            <div className="relative z-20 col-start-2  flex flex-col items-center text-center text-brand-white">

                <div className='w-full border-t border-brand-white/25 '>
                    <div className="flex flex-col max-w-[1080px] px-[80px] py-[48px] border-x border-brand-white/25 m-auto">
                        <div
                            className="inline-flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/10 text-brand-accent-text px-[17px] py-[5px] text-xs mb-[20px] font-sans font-normal w-fit ">
                            <span className="w-1.5 h-1.5 bg-brand-accent rounded-full"></span>
                            W3C Verifiable Credentials • Open Standards • Cryptographic Trust
                        </div>

                        <h1 className="inline-flex text-start font-serif text-5xl md:text-[58px] font-bold mb-[20px] leading-[1.1]  ">
                            Issue and verify digital certificates with trust
                        </h1>

                        <p className="inline-flex font-sans text-base font-normal mb-[20px]  ">
                            A workspace to research, enrich, and act on your data all at once.
                        </p>

                        <div className="inline-flex flex-col sm:flex-row gap-5  w-full sm:w-auto">
                            <Link
                                href="/issue"
                                className="bg-brand-btn hover:bg-brand-btn/90 text-brand-white text-[15px] font-medium px-[24px] py-[12px] transition-colors text-center"
                            >
                                Issue Certificates
                            </Link>
                            <Link
                                href="/verify"
                                className="border border-brand-white/40 hover:bg-white/10 text-brand-white text-[15px] font-medium px-[24px] py-[12px] transition-colors text-center"
                            >
                                Verify Certificate
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full border-t border-brand-white/25 ">
                    <img
                        src="/img/hero-add-img.png"
                        alt="Certifd Dashboard"
                        className="w-full h-auto px-[32px] pt-[28px] max-w-[1080px] mx-auto border-x border-brand-white/25"
                    />
                </div>
            </div>
        </section>
    );
};