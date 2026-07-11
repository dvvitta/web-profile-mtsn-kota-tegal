import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-green-950 text-white pt-16 pb-8 px-8 md:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 max-w-7xl mx-auto px-9">
                {/* Video 1 */}
                <iframe
                    className="w-full aspect-video rounded-xl"
                    src="https://www.youtube.com/embed/cg71be1-rUU?si=Pq_ra5xuoxpMO5pa"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
                
                {/* Video 2 (Link Diperbarui & Disesuaikan format Embed) */}
                <iframe
                    className="w-full aspect-video rounded-xl"
                    src="https://www.youtube.com/embed/qcWTKq74z6U?si=63tOM8YOqTP0CWkn"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
                
                {/* Video 3 (Link Diperbarui & Disesuaikan format Embed) */}
                <iframe
                    className="w-full aspect-video rounded-xl"
                    src="https://www.youtube.com/embed/8da-PkVsvAo?si=4Lz4B9e2LvIKoBOw"
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
                        <a href="https://www.facebook.com/groups/535631189901657/?locale=id_ID" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Facebook">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a href="https://www.instagram.com/mts_negeri_kotategal?igsh=eHA3bWJlZ2JzcnY1" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600 transition-colors" aria-label="Instagram">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>

                        {/* YouTube */}
                        <a href="https://www.youtube.com/@MtsnKotategal" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600 transition-colors" aria-label="YouTube">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.503 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.387.508 9.387.508s7.517 0 9.387-.508a3.003 3.003 0 0 0 2.11-2.11c.503-1.87.503-5.837.503-5.837s0-3.967-.503-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                    </div>

                    {/* --- Copyright Text --- */}
                    <div className="text-center text-sm text-gray-500">
                        <Link to="/LoginPage">
                            MTsN Kota Tegal
                        </Link> &nbsp;|&nbsp;
                        © 2026 MTsN Kota Tegal. All rights reserved
                        <Link to="/LoginPage">
                        .
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;