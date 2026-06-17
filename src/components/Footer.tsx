import { LiquidLogo } from './LiquidLogo';

export function Footer() {
  return (
    <footer className="surface border-t border-color px-[5%] pt-[3rem] pb-[2rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-[3rem] mb-[3rem]">
         <div>
           <a href="#" className="mb-[1rem] block w-max">
             <LiquidLogo />
           </a>
          <p className="text-[#8888aa] text-[0.88rem] max-w-[240px] mb-2">Digital Marketing • AI Automation • Web Development • Advertising Agency</p>
          <p className="text-[#8888aa] text-[0.88rem] max-w-[300px]">Helping Businesses Scale With Technology, AI & Digital Growth.</p>
        </div>
        
        <div>
          <h5 className="font-display font-bold mb-[1rem] text-[0.9rem] text-white">Services</h5>
          <ul className="flex flex-col gap-[0.6rem] m-0 p-0 list-none">
            <li><a href="#services" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">Website Development</a></li>
            <li><a href="#services" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">AI Automation</a></li>
            <li><a href="#services" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">WhatsApp API</a></li>
            <li><a href="#services" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">SEO, GEO, & AEO</a></li>
            <li><a href="#services" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">App Development</a></li>
            <li><a href="#services" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">Advertising & Branding</a></li>
            <li><a href="#services" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">Social Media Marketing</a></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-display font-bold mb-[1rem] text-[0.9rem] text-white">Company</h5>
          <ul className="flex flex-col gap-[0.6rem] m-0 p-0 list-none">
            <li><a href="#about" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">About Us</a></li>
            <li><a href="#projects" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">Case Studies</a></li>
            <li><a href="#team" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">Meet the Team</a></li>
            <li><a href="#faq" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-display font-bold mb-[1rem] text-[0.9rem] text-white">Contact</h5>
          <ul className="flex flex-col gap-[0.6rem] m-0 p-0 list-none">
            <li><a href="mailto:hello@hypezilla.agency" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">Email Support</a></li>
            <li><a href="https://wa.me/919058221232" target="_blank" rel="noopener noreferrer" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">WhatsApp Support</a></li>
            <li><a href="#contact" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">Business Consultation</a></li>
            <li className="pt-2"><a href="tel:9058221232" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">📞 +91 90582 21232</a></li>
            <li><a href="tel:8439922493" className="text-[#8888aa] text-[0.88rem] hover:text-white transition-colors">📞 +91 84399 22493</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-color pt-[1.5rem] flex flex-wrap justify-between items-center gap-[1rem] text-[#8888aa] text-[0.82rem]">
        <span>© {new Date().getFullYear()} Hypezilla Agency. All rights reserved.</span>
        <div className="flex gap-[0.8rem]">
          <a href="#" className="w-[36px] h-[36px] rounded-full border border-color flex items-center justify-center text-[#8888aa] text-[0.85rem] transition-colors hover:border-[#cc2428] hover:text-[#cc2428]">in</a>
          <a href="#" className="w-[36px] h-[36px] rounded-full border border-color flex items-center justify-center text-[#8888aa] text-[0.85rem] transition-colors hover:border-[#cc2428] hover:text-[#cc2428]">f</a>
          <a href="#" className="w-[36px] h-[36px] rounded-full border border-color flex items-center justify-center text-[#8888aa] text-[0.85rem] transition-colors hover:border-[#cc2428] hover:text-[#cc2428]">ig</a>
          <a href="#" className="w-[36px] h-[36px] rounded-full border border-color flex items-center justify-center text-[#8888aa] text-[0.85rem] transition-colors hover:border-[#cc2428] hover:text-[#cc2428]">yt</a>
        </div>
      </div>
    </footer>
  );
}
