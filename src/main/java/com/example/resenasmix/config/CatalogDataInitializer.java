package com.example.resenasmix.config;

import com.example.resenasmix.model.Videojuego;
import com.example.resenasmix.repository.VideojuegoRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class CatalogDataInitializer implements CommandLineRunner {
    private final VideojuegoRepository repository;
    private final boolean enabled;

    public CatalogDataInitializer(VideojuegoRepository repository,
                                  @Value("${app.seed-catalog:true}") boolean enabled) {
        this.repository = repository;
        this.enabled = enabled;
    }

    @Override
    public void run(String... args) {
        if (!enabled || repository.count() > 0) return;
        repository.saveAll(List.of(
            game("GTA V", "Mundo abierto", "PS5", 24990, 14990, true,
                "https://i.blogs.es/4a6a62/gta-v-especial-10-anos/1366_521.jpeg",
                "Explora Los Santos a través de las historias de Michael, Franklin y Trevor. Realiza misiones, participa en persecuciones y recorre un mundo abierto lleno de posibilidades."),
            game("Minecraft", "Sandbox", "PC", 19990, null, false,
                "https://r2.gem-awards.com/news/67f41076950961.50166997.png",
                "Construye, explora y crea en un mundo de bloques. Recolecta materiales, fabrica herramientas y descubre biomas en supervivencia o modo creativo."),
            game("Valorant", "Shooter", "PC", 0, null, false,
                "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/aa65264cd8ebcdafb3fa5d28d434bcc108595050-1920x1080.jpg?accountingTag=VAL&w=1200&h=630&fm=webp&fit=crop&crop=center",
                "Shooter táctico por equipos que combina precisión con armas y habilidades especiales. La comunicación y la estrategia son esenciales."),
            game("EA Sports FC 24", "Deportes", "PS5", 29990, 19990, true,
                "https://gonintendo.com/attachments/image/42112/file/medium-bcacd1a9410c9f9a59c51c7a372de225.jpg",
                "Simula partidos de fútbol, construye tu equipo y compite en línea o en modos para un jugador."),
            game("The Legend of Zelda: Breath of the Wild", "Aventura", "Nintendo Switch", 44990, null, false,
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRBK93HhQLCbI_vIc5dkXdcsAUPn7kCFdPA59sbk_ZVw&s=10",
                "Explora Hyrule como Link, recupera tus recuerdos, escala montañas y descubre santuarios y secretos."),
            game("Fortnite", "Battle Royale", "PS5", 0, null, false,
                "https://fortnite-api.com/images/cosmetics/br/CID_028_Athena_Commando_F/icon.png",
                "Compite por ser el último superviviente en una isla con armas, recursos, construcción, colaboraciones y eventos."),
            game("Call of Duty: Warzone", "Shooter", "PC", 0, null, false,
                "https://i.blogs.es/11123b/bocw-s4-announcement-022/840_560.jpeg",
                "Combate en línea en mapas de gran tamaño. Busca equipamiento, coordínate con tu escuadrón y lucha por sobrevivir."),
            game("Overwatch 2", "Shooter", "PC", 0, null, false,
                "https://media.vandal.net/m/10-2022/202210111759567_1.jpg",
                "Shooter por equipos con héroes y habilidades únicas. Colabora, cumple objetivos y combina estrategias."),
            game("Red Dead Redemption 2", "Mundo abierto", "PS4", 39990, null, false,
                "https://fotografias-neox.atresmedia.com/clipping/cmsimages01/2018/10/31/647C01D3-C41C-47EF-B258-FB28D943AC45/69.jpg?crop=1920,1080,x0,y69&width=1280&height=720&optimize=low",
                "Acompaña a Arthur Morgan y a la banda de Van der Linde durante los últimos años del Viejo Oeste."),
            game("Resident Evil 4", "Terror", "PS5", 34990, 24990, true,
                "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000012858/f4d4fd20c956621c4a342a8cade2e366f0e3cd43765bb52eccd0fea32b1606ce",
                "Leon S. Kennedy debe rescatar a la hija del presidente. Enfréntate a enemigos infectados y administra tus recursos en esta aventura de terror y supervivencia.")
        ));
    }

    private Videojuego game(String titulo, String genero, String consola, long precio,
                            Long precioOferta, boolean enOferta, String imagen, String descripcion) {
        Videojuego videojuego = new Videojuego();
        videojuego.setTitulo(titulo);
        videojuego.setGenero(genero);
        videojuego.setConsola(consola);
        videojuego.setPrecio(BigDecimal.valueOf(precio));
        videojuego.setPrecioOferta(precioOferta == null ? null : BigDecimal.valueOf(precioOferta));
        videojuego.setEnOferta(enOferta);
        videojuego.setImagen(imagen);
        videojuego.setDescripcion(descripcion);
        return videojuego;
    }
}
