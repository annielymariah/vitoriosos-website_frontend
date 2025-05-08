const Footer = () => {
  return (
    <footer className="w-full mt-auto">
      <div
        className="w-full"
        style={{
          backgroundImage: `url('/footer.svg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "14rem",
        }}
      >
        <div className="max-w-6xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="col-span-1">
              <h2 className="text-2xl font-bold mb-2 font-staatliches text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                VITORIOSOS MOVIMENTO
              </h2>
              <p className="text-xs font-inter opacity-90">
                Nossa missão é resgatar jovens e adolescentes para viverem a cultura do
                Reino de <span className="font-bold">Deus</span>.
              </p>
            </div>

            <div>
              <h3 className="text-md font-semibold mb-2">Links</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="hover:underline text-sm">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm">
                    Eventos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-sm">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h3 className="text-md font-semibold mb-2">Contato</h3>
              <ul className="space-y-1 text-sm">
                <li>vitoriososmovimento@gmail.com</li>
                <li>58706-040</li>
                <li>
                  Rua Antônio Félix, 1166, São Sebastião
                  <br />
                  Patos - PB, Brasil
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-md font-semibold mb-2">Redes Sociais</h3>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <span className="text-xs">IG</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <span className="text-xs">YT</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>


  <div className="h-[1px] w-full bg-gradient-to-r  from-black to-[#31D92B]"></div>
  <div className="bg-[#31D92B] text-black py-3">
    <div className="max-w-6xl mx-auto px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
      <p>
        © {new Date().getFullYear()} Vitoriosos Movimento. Todos os direitos
        reservados.
      </p>
      <div className="flex gap-4">
        <a href="#" className="hover:underline">
          Termos de Uso
        </a>
        <a href="#" className="hover:underline">
          Política de Privacidade
        </a>
      </div>
    </div>
  </div>
</div>
    </footer>
  );
};

export default Footer;
