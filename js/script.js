$(document).ready(function() {
    const fechaCorrecta = "2024-07-27";

    $('#btn-entrar').click(function() {
        if ($('#input-fecha').val() === fechaCorrecta) {
            $('#pantalla-login').fadeOut(500, function() {
                $('#pantalla-pregunta').fadeIn();
                document.getElementById('musica').play(); 
            });
        } else {
            $('.glass-card').addClass('animate__shakeX');
            setTimeout(() => $('.glass-card').removeClass('animate__shakeX'), 1000);
        }
    });

    $('#btn-recuerdos').click(function() {
        window.open('recuerdos.html', '_blank');
    });

    // Variable para controlar si es la primera vez que toca el "No"
    let primerIntentoNo = true;

    // Modificación del Botón No
    $('#btn-no').on('mouseover touchstart', function() {
        // 1. Si es la primera vez, abrimos recuerdos
        if (primerIntentoNo) {
            window.open('recuerdos.html', '_blank');
            primerIntentoNo = false; // Cambiamos a false para que no se repita
        }
        
        // 2. Ejecutamos la funcionalidad de moverse (para este y los siguientes intentos)
        const x = Math.random() * (window.innerWidth - $(this).width());
        const y = Math.random() * (window.innerHeight - $(this).height());
        $(this).css({ 
            position: 'absolute', 
            transition: '0.2s', // Hace que el salto sea más fluido
            left: x, 
            top: y 
        });
    });

    $('#btn-si').click(function() {
        $('#pantalla-pregunta').fadeOut(500, function() {
            $('#pantalla-final').fadeIn();
            iniciarGalaxia();
            escribirCarta();
        });
    });

    function iniciarGalaxia() {
        const canvas = document.getElementById('canvas-galaxia');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        let stars = [];
        for(let i=0; i<150; i++) stars.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, s: Math.random()*2});
        function draw() {
            ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle = "white";
            stars.forEach(st => {
                ctx.beginPath(); ctx.arc(st.x, st.y, st.s, 0, Math.PI*2); ctx.fill();
                st.y -= 0.5; if(st.y < 0) st.y = canvas.height;
            });
            requestAnimationFrame(draw);
        }
        draw();
    }

    function escribirCarta() {
        const texto = [
            "Me detuve un momento a mirar las estrellas y entendí algo...",
            "Que ninguna de ellas brilla tanto como tus ojos cuando te ríes.",
            "A veces me pregunto qué hice bien para merecer que camines a mi lado.",
            "Gracias a Dios y a tí por estos 3 años, por los días grises donde me sostuviste...",
            "y por los días brillantes donde fuiste mi sol.",
            "Si me dieran a elegir mil vidas más,",
            "en las mil te buscaría a ti...",
            "Te amo con toda mi alma, porque eres todo lo que siempre soñé. ❤️"
        ];

        let lineaActual = 0;
        let caracterActual = 0;
        const contenedor = $('#texto-mecanografia');
        const scrollContainer = document.querySelector('.carta-container');

        function escribirLinea() {
            if (lineaActual < texto.length) {
                if (caracterActual < texto[lineaActual].length) {
                    contenedor.append(texto[lineaActual].charAt(caracterActual));
                    caracterActual++;
                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
                    setTimeout(escribirLinea, 50);
                } else {
                    contenedor.append("<br><br>");
                    lineaActual++;
                    caracterActual = 0;
                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
                    setTimeout(escribirLinea, 1000);
                }
            } else {
                $('#contenedor-boton-final').fadeIn(2000);
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
        contenedor.empty();
        escribirLinea();
    }

    // SOPORTE DRAG PARA MÓVIL
    $('.polaroid').on('mousedown touchstart', function(e) {
        let el = $(this);
        el.css('z-index', 1000).siblings('.polaroid').css('z-index', 50);
        let event = e.type === 'touchstart' ? e.originalEvent.touches[0] : e;
        let ox = event.pageX - el.offset().left;
        let oy = event.pageY - el.offset().top;

        $(document).on('mousemove.drag touchmove.drag', function(e) {
            let ev = e.type === 'touchmove' ? e.originalEvent.touches[0] : e;
            el.offset({top: ev.pageY - oy, left: ev.pageX - ox});
        });

        $(document).on('mouseup touchend', function() {
            $(document).off('mousemove.drag touchmove.drag');
        });
    });
});