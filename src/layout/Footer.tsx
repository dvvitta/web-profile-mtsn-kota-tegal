const Footer = () => {
    return (
        <footer className="bg-green-950 text-white pt-16 pb-8 px-8 md:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 max-w-7xl mx-auto px-9">
                <iframe
                    src="https://www.youtube.com/embed/gV3bHotDFZw?si=NLglIW8zAm4SRzeF"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
                <iframe
                    src="https://www.youtube.com/embed/5kB8a-1KRvU?si=k_sXUJipghjmtSXA"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
                <iframe
                    src="https://www.youtube.com/embed/rmHIvL9y9a4?si=uw3CeYP2EwSZrYCN"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>

            </div>
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-4 border-t border-green-900 pt-8">

                    {/* --- Sosmed Icons Container --- */}
                    <div className="flex items-center space-x-6">
                        {/* Facebook */}
                        <a href="https://www.facebook.com/mankotategal.id" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Facebook">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a href="https://www.instagram.com/mankotategal?igsh=eXRvY3pyM3owOWdl" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600 transition-colors" aria-label="Instagram">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>

                        {/* YouTube */}
                        <a href="https://www.youtube.com/channel/UChtRnpUFFRMd-riOdIHhWHw" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600 transition-colors" aria-label="YouTube">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.503 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.387.508 9.387.508s7.517 0 9.387-.508a3.003 3.003 0 0 0 2.11-2.11c.503-1.87.503-5.837.503-5.837s0-3.967-.503-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>

                        {/* TikTok */}
                        <a href="https://www.tiktok.com/@man.kotategal" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors" aria-label="TikTok">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.05 1.62 4.2 1.22 1.4 2.97 2.27 4.79 2.51v3.9c-1.8-.17-3.54-.95-4.89-2.19-.15-.14-.29-.29-.42-.44V15.75c-.03 2.11-.74 4.21-2.09 5.8-1.74 2.13-4.41 3.39-7.14 3.44-2.85.11-5.74-.98-7.55-3.18C-.46 19.34-1 16.03-.49 13.1c.56-3.04 2.66-5.71 5.56-6.85.95-.38 1.98-.58 3-.58v4.06c-1.63.06-3.26.96-4.08 2.4-.88 1.51-.77 3.55.33 4.91a4.938 4.938 0 0 0 6.64.44c1.19-.94 1.74-2.5 1.62-4.01V.02z" />
                            </svg>
                        </a>
                    </div>

                    {/* --- Copyright Text --- */}
                    <div className="text-center text-sm text-gray-500">
                        © 2026 MTsN Kota Tegal. All rights reserved.
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;