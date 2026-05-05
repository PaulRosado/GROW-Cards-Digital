// === 1. CONFIGURACIÓN E INTERFAZ ===
// Asegúrate de que tu clave esté bien pegada entre las comillas
const GEMINI_API_KEY = "AIzaSyCYWQUbEDHVQ8LUIpRZRJZnpqqkOZdI1fw";

// Esta es la URL correcta para el modelo más reciente (Gemini 2.0 Flash)
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const INSTRUCTIONS = {
    es: "Presione la carta para escuchar la pregunta",
    en: "Press the card to hear the question",
    pt: "Pressione a carta para ouvir a pergunta"
};

const UI_TEXTS = {
    es: { title: "GROW Coaching", back: "⬅ Menú", nextQ: "Otra Pregunta", nextP: "Siguiente Fase", phase: "FASE" },
    en: { title: "GROW Coaching", back: "⬅ Menu", nextQ: "Another One", nextP: "Next Phase", phase: "PHASE" },
    pt: { title: "GROW Coaching", back: "⬅ Menu", nextQ: "Mais Uma", nextP: "Próxima Fase", phase: "FASE" }
};

const mazoMaster = {
    estudiantes: {
        icono: "🎓", color: "#2a52be",
        titulos: { es: "Éxito Académico", en: "Academic Success", pt: "Sucesso Acadêmico" },
        preguntas: {
            es: {
                G: ["¿Qué nota específica buscas en tu examen más difícil?", "¿Cómo se ve tu perfil profesional al graduarte?", "¿Qué habilidad dominarás al fin del ciclo?", "¿Cuál es el logro que más te enorgullecería?", "¿Qué quieres que sea diferente en tu estudio hoy?", "¿Qué nivel de dominio técnico buscas?", "¿Cómo sabrás que esta sesión fue un éxito?", "¿Qué meta pequeña cumplirás esta semana?", "¿Qué impacto tendrá este título en tu vida?", "¿Cuál es tu prioridad número uno hoy?"],
                R: ["¿Cuántas horas de estudio real dedicas hoy?", "¿Qué concepto técnico te genera más carga?", "¿Qué resultados has obtenido previamente?", "¿Qué hábitos sabotean tu rendimiento?", "¿Con qué recursos cuentas para este curso?", "¿Qué tan cerca estás de tu meta (1-10)?", "¿Qué feedback has recibido de tus profes?", "¿Qué es lo que más te cuesta entender?", "¿Qué estás haciendo que no funciona?", "¿Cuál es el obstáculo externo más grande?"],
                O: ["¿Qué recursos de la biblioteca no has usado?", "¿Cómo aplicarías Design Thinking para estudiar?", "¿Qué pasaría si estudiaras en grupo?", "¿Qué herramientas de IA usarías?", "¿Qué harías si no tuvieras miedo a fallar?", "¿Qué otros métodos de organización probarías?", "¿Cómo podrías simplificar este tema?", "¿A quién podrías pedirle una tutoría?", "¿Qué harías con el doble de tiempo?", "¿Qué harías si fueras el profesor?"],
                W: ["¿Qué tema vas a repasar hoy mismo?", "¿A qué distracción le dirás 'no' mañana?", "¿Cuál es tu paso pequeño para empezar ya?", "¿Cuándo realizarás tu próxima sesión?", "¿Qué compromiso firmas contigo mismo hoy?", "¿Cómo medirás tu progreso al final del día?", "¿A quién le contarás tu meta para cumplirla?", "¿Qué recompensa te darás al terminar?", "¿Qué vas a dejar de hacer para enfocarte?", "¿Cuál es tu acción inmediata al cerrar la app?"]
            },
            en: {
                G: ["What specific grade are you seeking?", "How does your professional profile look?", "What skill will you master by semester's end?", "What achievement would make you proudest?", "What should be different in your study today?", "What level of technical mastery do you seek?", "How will you know this session was successful?", "What small goal will you hit this week?", "What impact will this degree have on your life?", "What is your number one priority today?"],
                R: ["How many real study hours do you give today?", "Which concept causes the most cognitive load?", "What results have you obtained previously?", "What habits are sabotaging your performance?", "What resources do you have for this course?", "How close are you to your goal (1-10)?", "What feedback have you received from teachers?", "What is the hardest thing for you to understand?", "What are you doing that is not working?", "What is the biggest external obstacle?"],
                O: ["What library resources haven't you used?", "How would you use Design Thinking to study?", "What if you studied in a group?", "What AI tools would accelerate your learning?", "What would you do if you weren't afraid to fail?", "What other organization methods would you try?", "How could you simplify this complex topic?", "Who could you ask for a mentorship?", "What would you do with double the time?", "What would you do if you were the teacher?"],
                W: ["What topic will you review today?", "What distraction will you say 'no' to?", "What is your small step to start now?", "When will you hold your next study session?", "What commitment do you sign with yourself?", "How will you measure your progress today?", "Who will you tell your goal to stay on track?", "What reward will you give yourself?", "What will you stop doing to focus more?", "What is your immediate action after this app?"]
            },
            pt: {
                G: ["Qual nota específica você busca?", "Como será seu perfil profissional ao se formar?", "Qual habilidade você dominará até o fim?", "Qual conquista acadêmica te daria mais orgulho?", "O que deve ser diferente no seu estudo hoje?", "Qual nível de domínio técnico você busca?", "Como saberá que esta sessão foi um sucesso?", "Qual pequena meta você cumprirá esta semana?", "Qual impacto este título terá na sua vida?", "Qual é a sua prioridade número um hoje?"],
                R: ["Quantas horas de estudo real você dedica hoje?", "Qual conceito gera mais carga cognitiva?", "Quais resultados você obteve anteriormente?", "Quais hábitos sabotam seu desempenho?", "Quais recursos você tem para este curso?", "Quão perto você está da meta (1-10)?", "Qual feedback você recebeu dos professores?", "O que é mais difícil para você entender?", "O que você está fazendo que não funciona?", "Qual é o maior obstáculo externo?"],
                O: ["Quais recursos da biblioteca você não usou?", "Como usaria Design Thinking para estudar?", "E se você estudasse em grupo?", "Quais ferramentas de IA acelerariam seu aprendizado?", "O que faria se não tivesse medo de reprovar?", "Quais outros métodos de organização tentaria?", "Como você poderia simplificar este tema?", "A quem você poderia pedir uma tutoria?", "O que faria com o dobro do tempo?", "O que faria se você fosse o professor?"],
                W: ["Qual tópico você vai revisar hoje?", "A qual distração você dirá 'não' amanhã?", "Qual é o passo pequeno para começar já?", "Quando será sua próxima sessão de estudo?", "Que compromisso você firma consigo hoje?", "Como medirá seu progresso ao fim do dia?", "Para quem contará sua meta para cumpri-la?", "Qual recompensa você se dará ao terminar?", "O que você deixará de fazer para focar?", "Qual sua ação imediata ao fechar o app?"]
            }
        }
    },
    programadores: {
        icono: "💻", color: "#2c3e50",
        titulos: { es: "Desarrollador", en: "Developer", pt: "Developer" },
        preguntas: {
            es: {
                G: ["¿Qué funcionalidad crítica debe quedar lista?", "¿Qué estándar de calidad quieres alcanzar?", "¿Cómo se ve el software sin errores?", "¿Qué quieres lograr en este sprint?", "¿Qué problema técnico resolverás hoy?", "¿Qué arquitectura quieres dominar?", "¿Cómo definirías el éxito de este commit?", "¿Qué mejora de rendimiento buscas?", "¿Qué quieres aprender de este bug?", "¿Cuál es el MVP de tu tarea actual?"],
                R: ["¿Dónde está el cuello de botella en tu código?", "¿Qué deuda técnica estás ignorando?", "¿Qué bugs te quitan más tiempo?", "¿Qué tan limpio está tu código hoy?", "¿Qué intentaste ya para solucionar el error?", "¿Qué dice la consola sobre el estado actual?", "¿Qué recursos técnicos te están faltando?", "¿Qué parte del flujo es la más frágil?", "¿Cuánto tiempo real te toma compilar?", "¿Qué suposiciones estás haciendo en tu lógica?"],
                O: ["¿Qué API simplificaría este proceso?", "¿Qué pasaría si refactorizas este módulo?", "¿Qué herramienta de IA usarías para el debug?", "¿Qué harías si no tuvieras miedo a romper el código?", "¿Cómo lo resolvería un Senior de tu equipo?", "¿Qué otra estructura de datos podrías usar?", "¿Cómo podrías automatizar esta tarea?", "¿Qué dice la documentación que no has visto?", "¿Qué harías si tuvieras que empezar de cero?", "¿Qué solución 'loca' funcionaría aquí?"],
                W: ["¿Cuándo vas a hacer el 'push' definitivo?", "¿Cuál es el primer test que escribirás?", "¿Qué documentación actualizarás hoy?", "¿A qué hora terminarás tu última línea?", "¿Qué paso darás para cerrar este ticket?", "¿Cómo validarás que el código es robusto?", "¿Con quién harás el Code Review?", "¿Qué deuda técnica pagarás hoy?", "¿Cuál es tu primer commit de mañana?", "¿Qué dejarás de procrastinar en el código?"]
            },
            en: {
                G: ["What critical feature must be ready?", "What quality standard do you want to hit?", "What does bug-free software look like?", "What do you want to achieve this sprint?", "What technical problem will you solve today?", "What architecture do you want to master?", "How do you define a successful commit?", "What performance boost are you seeking?", "What do you want to learn from this bug?", "What is the MVP of your current task?"],
                R: ["Where is the bottleneck in your code?", "What technical debt are you ignoring?", "Which bugs take most of your time?", "How clean is your code today?", "What have you already tried to fix the error?", "What does the console say about the state?", "What technical resources are you missing?", "Which part of the flow is the most fragile?", "How long does it take to compile?", "What assumptions are you making in your logic?"],
                O: ["Which API would simplify this process?", "What if you refactor this module?", "What AI tool would you use for debugging?", "What if you weren't afraid to break the code?", "How would a Senior Dev solve this?", "What other data structure could you use?", "How could you automate this task?", "What does the documentation say?", "What if you had to start from scratch?", "What 'crazy' solution might work here?"],
                W: ["When will you do the final push?", "What is the first test you will write?", "Which documentation will you update today?", "What time will you finish your last line?", "What step will you take to close this ticket?", "How will you validate the code is robust?", "Who will you do the Code Review with?", "What technical debt will you pay today?", "What is your first commit tomorrow?", "What will you stop procrastinating on?"]
            },
            pt: {
                G: ["Qual funcionalidade crítica deve estar pronta?", "Qual padrão de qualidade você quer atingir?", "Como seria o software sem erros?", "O que você quer alcançar neste sprint?", "Qual problema técnico você resolverá hoje?", "Qual arquitetura você quer dominar?", "Como você define um commit de sucesso?", "Qual melhoria de desempenho você busca?", "O que você quer aprender com este bug?", "Qual é o MVP da sua tarefa atual?"],
                R: ["Onde está o gargalo no seu código?", "Qual dívida técnica você está ignorando?", "Quais bugs tomam mais seu tempo?", "Quão limpo está seu código hoje?", "O que você já tentou para corrigir o erro?", "O que o console diz sobre o estado atual?", "Quais recursos técnicos estão faltando?", "Qual parte do fluxo é a mais frágil?", "Quanto tempo leva para compilar?", "Quais suposições você está fazendo na lógica?"],
                O: ["Qual API simplificaria este processo?", "E se você refatorar este módulo?", "Qual ferramenta de IA usaria para o debug?", "E se você não tivesse medo de quebrar o código?", "Como um desenvolvedor Senior resolveria isso?", "Que outra estrutura de dados poderia usar?", "Como você poderia automatizar esta tarefa?", "O que a documentação diz que você não viu?", "E se você tivesse que começar do zero?", "Qual solução 'louca' funcionaria aqui?"],
                W: ["Quando você fará o push definitivo?", "Qual é o primeiro teste que escreverá?", "Qual documentação você atualizará hoje?", "A que horas terminará sua última linha?", "Qual passo dará para fechar este ticket?", "Como validará que o código é robusto?", "Com quem você fará o Code Review?", "Qual dívida técnica pagará hoje?", "Qual seu primeiro commit de amanhã?", "O que você deixará de procrastinar no código?"]
            }
        }
    },
    psicologia: {
        icono: "🧠", color: "#9b59b6",
        titulos: { es: "Bienestar y Terapia", en: "Wellbeing and Therapy", pt: "Bem-estar e Terapia" },
        preguntas: {
            es: {
                G: ["¿Qué cambio conductual quieres ver en ti?", "¿Cómo definirías tu estado de paz ideal?", "¿Qué quieres sentir al final de esta sesión?", "¿Qué versión de ti quieres construir?", "¿Cuál es tu meta emocional hoy?", "¿Qué herida quieres empezar a sanar?", "¿Cómo se ve tu equilibrio mental?", "¿Qué quieres lograr en tu terapia hoy?", "¿Qué paz interna estás buscando?", "¿Cuál es tu prioridad para tu mente hoy?"],
                R: ["¿Qué detonantes activan tu malestar hoy?", "¿Qué mecanismos de defensa estás usando?", "¿Qué has intentado ya para sentirte mejor?", "¿En qué parte del cuerpo sientes la tensión?", "¿Qué pensamientos te están limitando hoy?", "¿Cómo está tu energía del 1 al 10?", "¿Qué situación externa te está drenando?", "¿Qué te dices a ti mismo cuando fallas?", "¿Qué estás evitando enfrentar hoy?", "¿Cuál es tu mayor miedo en este momento?"],
                O: ["¿Qué técnica de respiración podrías usar?", "¿Cómo te hablarías con total compasión?", "¿Qué pasaría si aceptaras esta emoción?", "¿Qué nueva rutina de autocuidado probarías?", "¿Qué diría tu 'yo' del futuro sobre esto?", "¿Qué harías si no tuvieras miedo al juicio?", "¿A quién podrías pedirle apoyo emocional?", "¿Qué otra perspectiva podrías tomar aquí?", "¿Qué harías si te perdonaras por completo?", "¿Cómo podrías cuidar tu espacio hoy?"],
                W: ["¿Qué acción pequeña harás por tu salud hoy?", "¿Con quién vas a establecer un límite?", "¿A qué hora practicarás tu meditación?", "¿Qué palabra de aliento te dirás hoy?", "¿Qué vas a dejar de tolerar para estar bien?", "¿Cuándo empezarás tu rutina de calma?", "¿Cómo vas a celebrar tu autocuidado?", "¿Qué paso darás para sanar hoy?", "¿A qué le dirás 'no' para proteger tu paz?", "¿Cuál es tu compromiso contigo hoy?"]
            },
            en: {
                G: ["What behavioral change do you want to see?", "How do you define your ideal state of peace?", "What do you want to feel after this session?", "What version of yourself are you building?", "What is your emotional goal today?", "What wound do you want to start healing?", "What does your mental balance look like?", "What do you want to achieve in therapy?", "What inner peace are you looking for?", "What is your mental priority today?"],
                R: ["What triggers are activating your distress?", "What defense mechanisms are you using?", "What have you tried to feel better?", "Where in your body do you feel tension?", "What thoughts are limiting you today?", "How is your energy from 1 to 10?", "What external situation is draining you?", "What do you tell yourself when you fail?", "What are you avoiding facing today?", "What is your biggest fear right now?"],
                O: ["What breathing technique could you use?", "How would you talk to yourself with compassion?", "What if you accepted this emotion?", "What new self-care routine would you try?", "What would your future self say about this?", "What if you weren't afraid of judgment?", "Who could you ask for emotional support?", "What other perspective could you take?", "What if you forgave yourself completely?", "How could you protect your space today?"],
                W: ["What small action will you take for health?", "Who will you set a boundary with?", "What time will you practice meditation?", "What word of encouragement will you say?", "What will you stop tolerating for wellbeing?", "When will you start your calm routine?", "How will you celebrate your self-care?", "What step will you take to heal today?", "What will you say 'no' to for peace?", "What is your commitment to yourself?"]
            },
            pt: {
                G: ["Qual mudança comportamental você quer ver?", "Como você define seu estado de paz ideal?", "O que você quer sentir após esta sessão?", "Que versão de si mesmo você quer construir?", "Qual é sua meta emocional hoje?", "Qual ferida você quer começar a curar?", "Como é o seu equilíbrio mental?", "O que você quer alcançar na terapia hoje?", "Qual paz interna você está buscando?", "Qual é sua prioridade mental hoje?"],
                R: ["Quais gatilhos ativam seu mal-estar hoje?", "Quais mecanismos de defesa você usa?", "O que você já tentou para se sentir melhor?", "Onde no corpo você sente a tensão?", "Quais pensamentos limitam você hoje?", "Como está sua energia de 1 a 10?", "Qual situação externa está te drenando?", "O que você diz a si mesmo quando falha?", "O que você está evitando enfrentar hoje?", "Qual é seu maior medo neste momento?"],
                O: ["Qual técnica de respiração poderia usar?", "Como falaria consigo com total compaixão?", "E se você aceitasse esta emoção?", "Que nova rotina de autocuidado tentaria?", "O que o seu 'eu' do futuro diria disso?", "E se não tivesse medo do julgamento?", "A quem poderia pedir apoio emocional?", "Qual outra perspectiva poderia adotar?", "E se você se perdoasse completamente?", "Como poderia cuidar do seu espaço hoje?"],
                W: ["Qual pequena ação fará pela saúde hoje?", "Com quem você estabelecerá um limite?", "A que horas praticará sua meditação?", "Que palavra de apoio dirá a si mesmo?", "O que deixará de tolerar para ficar bem?", "Quando começará sua rotina de calma?", "Como celebrará seu autocuidado hoje?", "Qual passo dará para curar-se hoje?", "A que dirá 'não' para proteger sua paz?", "Qual é seu compromisso consigo hoje?"]
            }
        }
    },
    relaciones: {
        icono: "❤️", color: "#e74c3c",
        titulos: { es: "Vínculos", en: "Relationships", pt: "Relacionamentos" },
        preguntas: {
            es: {
                G: ["¿Qué conexión buscas construir?", "¿Cómo se ve una relación sana para ti?", "¿Qué quieres aportar a este vínculo hoy?", "¿Qué esperas de esta conversación?", "¿Cómo quieres que la otra persona se sienta?", "¿Qué valor quieres honrar en esta relación?", "¿Cómo definirías el éxito de este vínculo?", "¿Qué armonía quieres alcanzar en casa?", "¿Qué quieres cambiar en tu forma de amar?", "¿Cuál es el propósito de estar juntos hoy?"],
                R: ["¿Qué necesidades no estás comunicando?", "¿Cuál es tu cuota de responsabilidad aquí?", "¿Qué genera tensión actualmente?", "¿Qué tan presente estás cuando escuchas?", "¿Qué suposiciones haces sobre el otro?", "¿Qué dice tu lenguaje corporal hoy?", "¿Qué patrones se repiten en tus peleas?", "¿Cuánto espacio das para el diálogo real?", "¿Qué te duele de esta situación?", "¿Qué estás ignorando por miedo al conflicto?"],
                O: ["¿Cómo expresarías tu sentir con 'lenguaje yo'?", "¿Qué actividad nueva podrían compartir?", "¿Qué pasaría si perdonaras este hecho?", "¿Cómo podrías mostrar más aprecio hoy?", "¿Qué diría un terapeuta de parejas de esto?", "¿Qué harías si no tuvieras que tener la razón?", "¿Cómo podrías sorprender positivamente?", "¿Qué otras formas de comunicación existen?", "¿Qué pasaría si escucharas sin juzgar?", "¿Cómo podrías pedir lo que necesitas?"],
                W: ["¿Qué palabra de afirmación dirás hoy?", "¿Cuándo conversarán sin pantallas?", "¿Qué gesto de cariño harás mañana?", "¿Cuál es tu primer paso para reconectar?", "¿A qué hora dedicarás tiempo de calidad?", "¿Qué límite vas a comunicar hoy?", "¿Cómo vas a celebrar este vínculo hoy?", "¿Qué vas a dejar de reclamar?", "¿Cuándo pedirás perdón si es necesario?", "¿Qué harás hoy para ser mejor compañero?"]
            },
            en: {
                G: ["What connection do you seek to build?", "What does a healthy relationship look like?", "What do you want to bring to this bond?", "What do you expect from this talk?", "How do you want the other person to feel?", "What value do you want to honor here?", "How do you define this bond's success?", "What harmony do you want at home?", "What do you want to change in your love?", "What is the purpose of being together?"],
                R: ["What needs are you not communicating?", "What is your share of responsibility?", "What is currently creating tension?", "How present are you when listening?", "What assumptions do you make?", "What does your body language say?", "What patterns repeat in your fights?", "How much space is for real dialogue?", "What hurts about this situation?", "What are you ignoring for fear of conflict?"],
                O: ["How would you express feelings with 'I' statements?", "What new activity could you share?", "What if you forgave this event?", "How could you show more appreciation?", "What would a couple's therapist say?", "What if you didn't have to be right?", "How could you positively surprise them?", "What other communication forms exist?", "What if you listened without judging?", "How could you ask for what you need?"],
                W: ["What word of affirmation will you say?", "When will you talk without screens?", "What caring gesture will you do tomorrow?", "What is your first step to reconnect?", "What time will you dedicate quality time?", "What boundary will you communicate today?", "How will you celebrate this bond today?", "What will you stop complaining about?", "When will you apologize if needed?", "What will you do to be a better partner?"]
            },
            pt: {
                G: ["Que conexão você busca construir?", "Como é um relacionamento saudável para você?", "O que você quer trazer para este vínculo?", "O que você espera desta conversa?", "Como você quer que a outra pessoa se sinta?", "Qual valor você quer honrar aqui?", "Como você define o sucesso deste vínculo?", "Qual harmonia você quer ter em casa?", "O que você quer mudar na sua forma de amar?", "Qual é o propósito de estarem juntos hoje?"],
                R: ["Quais necessidades você não comunica?", "Qual é a sua parcela de responsabilidade?", "O que gera tensão atualmente?", "Quão presente você está ao ouvir?", "Quais suposições você faz sobre o outro?", "O que sua linguagem corporal diz?", "Quais padrões se repetem nas brigas?", "Quanto espaço existe para o diálogo real?", "O que te magoa nesta situação?", "O que você ignora por medo do conflito?"],
                O: ["Como expressaria o sentir com 'linguagem eu'?", "Que atividade nova poderiam compartilhar?", "E se você perdoasse este fato?", "Como poderia mostrar mais apreço hoje?", "O que um terapeuta diria sobre isso?", "E se não tivesse que ter sempre a razão?", "Como poderia surpreender positivamente?", "Que outras formas de comunicação existem?", "E se você ouvisse sem julgar?", "Como poderia pedir o que você precisa?"],
                W: ["Qual palavra de afirmação dirá hoje?", "Quando conversarão sem telas?", "Que gesto de carinho fará amanhã?", "Qual seu primeiro passo para reconectar?", "A que horas dedicará tempo de qualidade?", "Qual limite você comunicará hoje?", "Como celebrará este vínculo hoje?", "O que deixará de reclamar?", "Quando pedirá perdão se for necessário?", "O que fará hoje para ser melhor parceiro?"]
            }
        }
    },
    liderazgo: {
        icono: "🚀", color: "#16a085",
        titulos: { es: "Liderazgo", en: "Leadership", pt: "Liderança" },
        preguntas: {
            es: {
                G: ["¿Qué impacto buscas generar en tu equipo?", "¿Cómo definirías un liderazgo exitoso hoy?", "¿Qué meta grupal es innegociable?", "¿Cómo quieres ser recordado como líder?", "¿Qué cultura quieres fomentar hoy?", "¿Qué resultado medible esperas ver?", "¿Cómo quieres que tu equipo se sienta?", "¿Qué visión quieres transmitir hoy?", "¿Qué éxito colectivo buscas?", "¿Cuál es tu prioridad como guía hoy?"],
                R: ["¿Cómo está el clima laboral hoy?", "¿Qué conflictos están afectando el ritmo?", "¿Cuál es tu mayor reto como líder ahora?", "¿Qué tan clara es la comunicación grupal?", "¿Qué feedback has recibido de tu gente?", "¿Qué brecha ves entre la meta y la realidad?", "¿Cuánto confía el equipo en tu dirección?", "¿Qué talentos estás subestimando?", "¿Qué errores estás cometiendo tú?", "¿Qué procesos están frenando al equipo?"],
                O: ["¿Cómo podrías delegar mejor esta tarea?", "¿Qué feedback constructivo no has dado?", "¿Qué iniciativa fomentaría la colaboración?", "¿Qué haría un líder que admiras aquí?", "¿Qué pasaría si dejaras decidir al equipo?", "¿Qué recursos de capacitación faltan?", "¿Cómo podrías motivar sin dinero?", "¿Qué otra estructura de equipo funcionaría?", "¿Qué cambio radical haría esto más ágil?", "¿Cómo podrías ser más empático hoy?"],
                W: ["¿Qué conversación difícil tendrás mañana?", "¿Cómo vas a reconocer un logro hoy?", "¿Cuál será tu primera instrucción clara?", "¿A qué hora harás el check-in con el equipo?", "¿Qué vas a dejar de controlar?", "¿Qué compromiso vas a pedir hoy?", "¿Cómo vas a celebrar el éxito grupal?", "¿Qué paso darás para inspirar hoy?", "¿Qué apoyo darás a quien más lo necesita?", "¿Cuál es tu acción de liderazgo hoy?"]
            },
            en: {
                G: ["What impact do you want to generate?", "How do you define successful leadership?", "What group goal is non-negotiable?", "How do you want to be remembered as a leader?", "What culture do you want to foster today?", "What measurable result do you expect?", "How do you want your team to feel?", "What vision do you want to transmit?", "What collective success do you seek?", "What is your priority as a guide today?"],
                R: ["How is the work climate today?", "What conflicts are affecting the pace?", "What is your biggest leadership challenge?", "How clear is group communication?", "What feedback have you received?", "What gap do you see from the goal?", "How much does the team trust you?", "What talents are you underestimating?", "What mistakes are you making?", "What processes are slowing the team down?"],
                O: ["How could you delegate this task better?", "What feedback haven't you given yet?", "What initiative would foster collaboration?", "What would a leader you admire do?", "What if you let the team decide?", "What training resources are missing?", "How could you motivate without money?", "What other team structure would work?", "What radical change would make it agile?", "How could you be more empathetic today?"],
                W: ["What difficult talk will you have tomorrow?", "How will you recognize an achievement?", "What will be your first clear instruction?", "What time will you check in with them?", "What will you stop controlling?", "What commitment will you ask for today?", "How will you celebrate group success?", "What step will you take to inspire?", "What support will you give today?", "What is your leadership action today?"]
            },
            pt: {
                G: ["Qual impacto você deseja gerar?", "Como você define uma liderança de sucesso?", "Qual meta grupal é inegociável?", "Como quer ser lembrado como líder?", "Qual cultura você quer fomentar hoje?", "Qual resultado mensurável você espera?", "Como você quer que sua equipe se sinta?", "Qual visão você quer transmitir hoje?", "Qual sucesso coletivo você busca?", "Qual sua prioridade como guia hoje?"],
                R: ["Como está o clima de trabalho hoje?", "Quais conflitos afetam o ritmo?", "Qual seu maior desafio como líder agora?", "Quão clara está a comunicação do grupo?", "Qual feedback você recebeu da equipe?", "Qual lacuna você vê em relação à meta?", "Quanto a equipe confia na sua direção?", "Quais talentos você está subestimando?", "Quais erros você está cometendo?", "Quais processos estão travando a equipe?"],
                O: ["Como você poderia delegar melhor?", "Qual feedback você ainda não deu?", "Qual iniciativa fomentaria a colaboração?", "O que um líder que você admira faria?", "E se você deixasse a equipe decidir?", "Quais recursos de treinamento faltam?", "Como motivar sem usar dinheiro?", "Qual outra estrutura funcionaria?", "Qual mudança radical tornaria isso ágil?", "Como você poderia ser mais empático?"],
                W: ["Qual conversa difícil terá amanhã?", "Como reconhecerá uma conquista hoje?", "Qual será sua primeira instrução clara?", "Que horas fará o check-in com a equipe?", "O que você deixará de controlar?", "Qual compromisso pedirá hoje?", "Como celebrará o sucesso do grupo?", "Qual passo dará para inspirar hoje?", "Qual apoio dará a quem mais precisa?", "Qual sua ação de liderança hoje?"]
            }
        }
    },
    finanzas: {
        icono: "💰", color: "#27ae60",
        titulos: { es: "Finanzas", en: "Finance", pt: "Finanças" },
        preguntas: {
            es: {
                G: ["¿Cuál es tu meta de ahorro este mes?", "¿Cómo se ve tu presupuesto ideal?", "¿Qué libertad financiera buscas?", "¿Cuánto quieres ganar a fin de año?", "¿Qué compra importante quieres realizar?", "¿Cómo se ve tu tranquilidad económica?", "¿Qué capital quieres acumular?", "¿Qué deuda quieres eliminar primero?", "¿Qué inversión quieres iniciar?", "¿Cuál es tu prioridad financiera hoy?"],
                R: ["¿En qué estás gastando más de lo debido?", "¿Qué deudas consumen tu paz hoy?", "¿Qué tan consciente eres de tus ingresos?", "¿Qué fugas de dinero tienes hoy?", "¿Cómo está tu fondo de emergencia?", "¿Qué errores financieros repites?", "¿Qué gastos hormiga puedes detectar?", "¿Cuál es tu balance bancario real hoy?", "¿Qué ingresos pasivos tienes?", "¿Qué tan ordenado están tus registros?"],
                O: ["¿Qué nueva fuente de ingreso explorarías?", "¿Cómo podrías reducir gastos fijos?", "¿Qué app de finanzas usarías?", "¿Qué pasaría si vendieras lo que no usas?", "¿Cómo podrías negociar este pago?", "¿Qué activo podrías comprar hoy?", "¿A quién podrías pedir asesoría financiera?", "¿Qué hábito de ahorro podrías crear?", "¿Qué pasaría si no compraras eso?", "¿Cómo generarías dinero extra hoy?"],
                W: ["¿Cuál será tu primer corte de gasto?", "¿A qué hora revisarás tu presupuesto?", "¿Qué compra cancelarás hoy mismo?", "¿Cuánto dinero separarás hoy?", "¿Qué deuda empezarás a pagar hoy?", "¿Qué compromiso de ahorro firmarás?", "¿Cómo medirás tus gastos mañana?", "¿Qué inversión pequeña harás hoy?", "¿Con quién hablarás de finanzas?", "¿Cuál es tu acción financiera hoy?"]
            },
            en: {
                G: ["What is your savings goal this month?", "What does your ideal budget look like?", "What financial freedom do you seek?", "How much do you want to earn by year-end?", "What major purchase do you want to make?", "What does economic peace look like?", "What capital do you want to build?", "Which debt do you want to clear first?", "What investment do you want to start?", "What is your financial priority today?"],
                R: ["Where are you overspending?", "Which debts consume your peace today?", "How aware are you of your income?", "What money leaks do you have today?", "How is your emergency fund?", "What financial mistakes do you repeat?", "What ghost expenses can you detect?", "What is your real bank balance today?", "What passive income do you have?", "How organized are your records?"],
                O: ["What new income source would you explore?", "How could you reduce fixed expenses?", "What finance app would you use?", "What if you sold what you don't use?", "How could you negotiate this payment?", "What asset could you buy today?", "Who could you ask for financial advice?", "What savings habit could you create?", "What if you didn't buy that?", "How would you make extra cash today?"],
                W: ["What will be your first spending cut?", "What time will you check your budget?", "Which purchase will you cancel today?", "How much money will you set aside?", "Which debt will you start paying?", "What savings pledge will you sign?", "How will you track spending tomorrow?", "What small investment will you make?", "Who will you talk to about finances?", "What is your financial action today?"]
            },
            pt: {
                G: ["Qual é sua meta de economia este mês?", "Como é o seu orçamento ideal?", "Qual liberdade financeira você busca?", "Quanto você quer ganhar até o fim do ano?", "Qual compra importante você quer fazer?", "Como é a sua tranquilidade econômica?", "Qual capital você quer acumular?", "Qual dívida você quer eliminar primeiro?", "Qual investimento você quer iniciar?", "Qual é sua prioridade financeira hoje?"],
                R: ["Onde você está gastando demais?", "Quais dívidas consomem sua paz hoje?", "Quão consciente você está da sua renda?", "Quais fugas de dinheiro você tem hoje?", "Como está sua reserva de emergência?", "Quais erros financeiros você repete?", "Quais pequenos gastos você detecta?", "Qual o saldo real da sua conta hoje?", "Que renda passiva você possui?", "Quão organizados estão seus registros?"],
                O: ["Qual nova fonte de renda exploraria?", "Como reduziria seus gastos fixos?", "Qual app de finanças você usaria?", "E se você vendesse o que não usa?", "Como poderia negociar este pagamento?", "Qual ativo você poderia comprar hoje?", "A quem pediria conselhos financeiros?", "Qual hábito de poupança criaria?", "E se você não comprasse isso?", "Como geraria dinheiro extra hoje?"],
                W: ["Qual será seu primeiro corte de gasto?", "Que horas você revisará seu orçamento?", "Qual compra você cancelará hoje?", "Quanto dinheiro você guardará hoje?", "Qual dívida começará a pagar hoje?", "Que compromisso de poupança assinará?", "Como medirá seus gastos amanhã?", "Qual investimento pequeno fará hoje?", "Com quem falará sobre finanças hoje?", "Qual é sua ação financeira hoje?"]
            }
        }
    },
    salud: {
        icono: "🍎", color: "#d35400",
        titulos: { es: "Salud", en: "Health", pt: "Saúde" },
        preguntas: {
            es: {
                G: ["¿Qué nivel de energía buscas al despertar?", "¿Qué meta física alcanzarás este mes?", "¿Cómo se ve tu cuerpo sano e ideal?", "¿Qué peso o condición quieres lograr?", "¿Cómo quieres sentirte al terminar el día?", "¿Qué cambio de salud es prioridad hoy?", "¿Cómo definirías tu vitalidad ideal?", "¿Qué deporte quieres dominar?", "¿Qué salud quieres tener en 10 años?", "¿Cuál es tu meta de bienestar hoy?"],
                R: ["¿Cómo es tu calidad de sueño hoy?", "¿Qué alimentos drenan tu energía?", "¿Cuántos días a la semana entrenas?", "¿Qué excusas pones para no cuidarte?", "¿Cómo está tu postura corporal hoy?", "¿Qué dolores físicos estás ignorando?", "¿Cuánta agua bebes realmente?", "¿Qué tan estresado te sientes (1-10)?", "¿Qué dice tu último chequeo médico?", "¿Qué hábitos tóxicos mantienes hoy?"],
                O: ["¿Qué deporte nuevo podrías intentar?", "¿Cómo integrarías movimiento al trabajo?", "¿Qué dieta simple podrías probar hoy?", "¿Qué pasaría si durmieras 8 horas?", "¿Qué dice un nutricionista de tu caso?", "¿Qué harías si no estuvieras cansado?", "¿Cómo podrías cocinar más en casa?", "¿Qué app de salud usarías?", "¿Qué pasaría si caminaras más?", "¿Cómo podrías relajarte sin pantallas?"],
                W: ["¿A qué hora vas a dormir hoy?", "¿Qué vas a desayunar mañana?", "¿Cuánta agua vas a beber hoy?", "¿Qué ejercicio harás en 15 minutos?", "¿Qué alimento evitarás hoy mismo?", "¿Cuándo pedirás tu cita médica?", "¿Qué compromiso de salud firmas hoy?", "¿Cómo medirás tus pasos mañana?", "¿A qué hábito dañino dirás 'no'?", "¿Cuál es tu acción de salud hoy?"]
            },
            en: {
                G: ["What energy level do you seek waking up?", "What physical goal will you hit this month?", "What does your healthy ideal body look like?", "What weight or condition do you seek?", "How do you want to feel at day's end?", "What health change is a priority today?", "How do you define your ideal vitality?", "What sport do you want to master?", "What health do you want in 10 years?", "What is your wellness goal today?"],
                R: ["How is your sleep quality today?", "Which foods drain your energy?", "How many days a week do you train?", "What excuses do you make to avoid care?", "How is your body posture today?", "What physical pains are you ignoring?", "How much water do you really drink?", "How stressed do you feel (1-10)?", "What does your last checkup say?", "What toxic habits do you keep today?"],
                O: ["What new sport could you try?", "How to integrate movement into work?", "What simple diet could you try today?", "What if you slept 8 hours?", "What does a nutritionist say about you?", "What if you weren't tired?", "How could you cook more at home?", "What health app would you use?", "What if you walked more?", "How could you relax without screens?"],
                W: ["What time will you go to sleep today?", "What will you eat for breakfast?", "How much water will you drink today?", "What 15-minute exercise will you do?", "What food will you avoid right now?", "When will you book your doctor visit?", "What health pledge do you sign today?", "How will you track steps tomorrow?", "Which harmful habit will you say 'no' to?", "What is your health action today?"]
            },
            pt: {
                G: ["Qual nível de energia você busca?", "Qual meta física alcançará este mês?", "Como é o seu corpo saudável ideal?", "Qual peso ou condição você busca?", "Como quer se sentir ao fim do dia?", "Qual mudança de saúde é prioridade hoje?", "Como define sua vitalidade ideal?", "Qual esporte você quer dominar?", "Que saúde quer ter daqui a 10 anos?", "Qual sua meta de bem-estar hoje?"],
                R: ["Como está sua qualidade de sono hoje?", "Quais alimentos drenam sua energia?", "Quantos dias por semana você treina?", "Quais desculpas você dá para não se cuidar?", "Como está sua postura corporal hoje?", "Quais dores físicas você ignora?", "Quanta água você bebe realmente?", "Quão estressado você está (1-10)?", "O que diz seu último check-up?", "Quais hábitos tóxicos mantém hoje?"],
                O: ["Qual esporte novo poderia tentar?", "Como integraria movimento ao trabalho?", "Qual dieta simples poderia tentar hoje?", "E se você dormisse 8 horas?", "O que um nutricionista diria de você?", "E se você não estivesse cansado?", "Como poderia cozinhar mais em casa?", "Qual app de saúde você usaria?", "E se você caminhasse mais?", "Como poderia relaxar sem telas?"],
                W: ["A que horas você vai dormir hoje?", "O que você vai tomar no café amanhã?", "Quanta água você vai beber hoje?", "Qual exercício fará em 15 minutos?", "Qual alimento evitará hoje mesmo?", "Quando marcará sua consulta médica?", "Que compromisso de saúde assina hoje?", "Como medirá seus passos amanhã?", "A qual hábito ruim dirá 'não'?", "Qual é sua ação de saúde hoje?"]
            }
        }
    },
    proposito: {
        icono: "✨", color: "#2980b9",
        titulos: { es: "Propósito", en: "Purpose", pt: "Propósito" },
        preguntas: {
            es: {
                G: ["¿Qué legado quieres dejar al mundo?", "¿Cuál es tu 'por qué' más profundo?", "¿Qué harías si el dinero no importara?", "¿Cuál es tu visión de vida a 5 años?", "¿Qué talento quieres compartir hoy?", "¿Cómo se ve una vida con propósito?", "¿Qué huella quieres dejar en otros?", "¿Cuál es el sentido de tu trabajo hoy?", "¿Qué te haría sentir pleno al final?", "¿Cuál es tu prioridad de vida hoy?"],
                R: ["¿En qué actividades pierdes la noción del tiempo?", "¿Qué haces por inercia y no por gusto?", "¿Qué tanto de tu tiempo dedicas a lo que amas?", "¿Qué miedos te alejan de tu propósito?", "¿Qué dice tu agenda sobre tus valores?", "¿Qué talentos tienes hoy desperdiciados?", "¿Qué tan satisfecho estás con tu vida (1-10)?", "¿Qué sacrificios estás haciendo hoy?", "¿Qué te hace sentir vacío en tu rutina?", "¿Qué personas te alejan de tu esencia?"],
                O: ["¿Cómo podrías monetizar tu pasión?", "¿Qué pasaría si dejaras de complacer a otros?", "¿Qué harías si tuvieras total libertad?", "¿Qué curso o mentor te acercaría a tu meta?", "¿Qué cambio de carrera podrías iniciar?", "¿Cómo ayudarías a otros con tu don?", "¿Qué pasaría si simplificaras tu vida?", "¿Qué otra ruta existe para tu felicidad?", "¿Qué diría tu 'yo' de 80 años hoy?", "¿Cómo podrías ser más auténtico hoy?"],
                W: ["¿Qué acción alineada a tus valores harás hoy?", "¿Qué compromiso vas a renovar contigo mismo?", "¿A qué le vas a dedicar tu próxima hora libre?", "¿Qué vas a dejar de hacer para ser tú mismo?", "¿Cuándo empezarás tu proyecto soñado?", "¿Cómo vas a medir tu plenitud hoy?", "¿A quién pedirás guía para tu camino?", "¿Qué paso darás para inspirar a otros?", "¿Qué miedo enfrentarás hoy mismo?", "¿Cuál es tu compromiso de propósito hoy?"]
            },
            en: {
                G: ["What legacy do you want to leave?", "What is your deepest 'why'?", "What would you do if money didn't matter?", "What is your 5-year life vision?", "What talent do you want to share today?", "What does a purposeful life look like?", "What mark do you want to leave on others?", "What is the sense of your work today?", "What would make you feel fulfilled?", "What is your life priority today?"],
                R: ["In what tasks do you lose track of time?", "What do you do out of habit, not joy?", "How much time is spent on what you love?", "What fears distance you from purpose?", "What does your schedule say about values?", "What talents are currently wasted?", "How satisfied are you (1-10)?", "What sacrifices are you making today?", "What makes you feel empty in routine?", "Who is distancing you from your essence?"],
                O: ["How could you monetize your passion?", "What if you stopped pleasing others?", "What would you do with total freedom?", "What course or mentor would bring you closer?", "What career change could you start?", "How would you help others with your gift?", "What if you simplified your life?", "What other route to happiness exists?", "What would your 80-year-old self say?", "How could you be more authentic today?"],
                W: ["What value-aligned action will you take?", "What pledge will you renew with yourself?", "What will you do with your next free hour?", "What will you stop doing to be yourself?", "When will you start your dream project?", "How will you measure fulfillment today?", "Who will you ask for guidance?", "What step will you take to inspire others?", "What fear will you face right now?", "What is your purpose pledge today?"]
            },
            pt: {
                G: ["Qual legado você deseja deixar?", "Qual é o seu 'porquê' mais profundo?", "O que faria se o dinheiro não importasse?", "Qual sua visão de vida para 5 anos?", "Qual talento você quer compartilhar hoje?", "Como é uma vida com propósito?", "Que marca você quer deixar nos outros?", "Qual o sentido do seu trabalho hoje?", "O que faria você se sentir pleno?", "Qual sua prioridade de vida hoje?"],
                R: ["Em quais tarefas você perde a noção do tempo?", "O que você faz por inércia e não prazer?", "Quanto tempo dedica ao que você ama?", "Quais medos te afastam do propósito?", "O que sua agenda diz sobre seus valores?", "Quais talentos estão desperdiçados hoje?", "Quão satisfeito você está (1-10)?", "Quais sacrifícios você faz hoje?", "O que te faz sentir vazio na rotina?", "Quais pessoas te afastam da sua essência?"],
                O: ["Como você poderia monetizar sua paixão?", "E se você parasse de agradar os outros?", "O que faria com total liberdade?", "Qual curso ou mentor te aproximaria da meta?", "Qual mudança de carreira poderia iniciar?", "Como ajudaria os outros com seu dom?", "E se você simplificasse sua vida?", "Qual outra rota para a felicidade existe?", "O que o seu 'eu' de 80 anos diria hoje?", "Como poderia ser mais autêntico hoje?"],
                W: ["Qual ação alinhada aos valores fará hoje?", "Que compromisso renovará consigo hoje?", "O que fará na sua próxima hora livre?", "O que deixará de fazer para ser você mesmo?", "Quando começará seu projeto dos sonhos?", "Como medirá sua plenitude hoje?", "A quem pedirá guia para seu caminho?", "Qual passo dará para inspirar outros?", "Qual medo enfrentará hoje mesmo?", "Qual seu compromisso de propósito hoje?"]
            }
        }
    }
}

// === 3. ESTADO GLOBAL ===
let idiomaActual = 'es', mazoSeleccionado = null, faseActual = 0, preguntaActualTexto = "";
let vozActivada = true, bitacoraSession = [], pilasPreguntas = { G: [], R: [], O: [], W: [] };
const fases = ['G', 'R', 'O', 'W'];
// Función para que la app lea el nombre del botón (Sugerencia A)

function leerEtiqueta(elemento) {
    if (!vozActivada) return;
    
    // Si es una categoría, buscamos el texto dentro del span de título
    let texto = elemento.innerText;
    
    // Si queremos que sea más limpio y no lea el emoji, podemos buscar solo el título:
    const titulo = elemento.querySelector('.selector-title');
    if (titulo) texto = titulo.innerText;

    hablar(texto);
}

// === 4. LÓGICA DE VOZ ===
function hablar(texto) {
    if (!vozActivada) return;
    window.speechSynthesis.cancel();
    const mensaje = new SpeechSynthesisUtterance(texto);
    mensaje.lang = 'es-ES';
    window.speechSynthesis.speak(mensaje);
}

function toggleVoice() {
    vozActivada = !vozActivada;
    document.getElementById('voice-icon').innerText = vozActivada ? "🔊" : "🔇";
    if (!vozActivada) window.speechSynthesis.cancel();
}

// === 5. NAVEGACIÓN Y MENÚ ===
function initMenu() {
    const grid = document.getElementById('grid-mazos');
    if (!grid) return;
    grid.innerHTML = '';
    for (let key in mazoMaster) {
        const m = mazoMaster[key];
        const div = document.createElement('div');
        div.className = 'card-selector';
        div.setAttribute('onmouseenter', 'leerEtiqueta(this)'); // <--- NUEVO
        div.setAttribute('ontouchstart', 'leerEtiqueta(this)'); // <--- NUEVO

        // Le damos el color nativo de la categoría y texto blanco para que parezca el reverso de una carta
        div.style.backgroundColor = m.color;
        div.style.color = "#ffffff";

        div.innerHTML = `<span class="selector-icon">${m.icono}</span><span class="selector-title">${m.titulos[idiomaActual]}</span>`;
        div.onclick = () => startCoaching(key);
        grid.appendChild(div);
    }
}

function startCoaching(key) {
    mazoSeleccionado = mazoMaster[key];
    faseActual = 0; bitacoraSession = []; pilasPreguntas = { G: [], R: [], O: [], W: [] };
    document.getElementById('menu-view').classList.add('hidden');
    document.getElementById('game-view').classList.remove('hidden');
    prepararNuevaPregunta();
    setTimeout(() => hablar(INSTRUCTIONS[idiomaActual]), 500);
}

function prepararNuevaPregunta() {
    const f = fases[faseActual];
    if (pilasPreguntas[f].length === 0) {
        pilasPreguntas[f] = [...mazoSeleccionado.preguntas[idiomaActual][f]].sort(() => Math.random() - 0.5);
    }
    preguntaActualTexto = pilasPreguntas[f].pop();
    document.getElementById('card-inner').classList.remove('is-flipped');
    document.getElementById('phase-letter').innerText = f;
    document.getElementById('question').innerText = preguntaActualTexto;
    document.getElementById('phase-label').innerText = `FASE: ${f}`;
    document.getElementById('card-front').style.backgroundColor = mazoSeleccionado.color;
    document.getElementById('mazo-active-label').innerText = mazoSeleccionado.titulos[idiomaActual];
}

function flipAndRead() {
    const inner = document.getElementById('card-inner');
    if (!inner.classList.contains('is-flipped')) {
        inner.classList.add('is-flipped');
        hablar(preguntaActualTexto);
    } else inner.classList.remove('is-flipped');
}

function reproducirPregunta() {
    const flipped = document.getElementById('card-inner').classList.contains('is-flipped');
    hablar(flipped ? preguntaActualTexto : INSTRUCTIONS[idiomaActual]);
}

function nextQuestion() { prepararNuevaPregunta(); setTimeout(() => hablar(INSTRUCTIONS[idiomaActual]), 600); }

// 2. Modifica tu función nextPhase() para que llame a la actualización
function nextPhase() {
    if (faseActual === 3) {
        if (bitacoraSession.length > 0) abrirModalFinish();
        else { 
            faseActual = 0; 
            actualizarProgreso(); // <--- Llamada aquí
            prepararNuevaPregunta(); 
        }
    } else { 
        faseActual++; 
        actualizarProgreso(); // <--- Llamada aquí
        prepararNuevaPregunta(); 
    }
}

// === 6. BITÁCORA Y MODALES ===
function abrirModal() {
    document.getElementById('modal-question-text').innerText = preguntaActualTexto;
    document.getElementById('user-text-answer').value = "";
    document.getElementById('modal-respuesta').classList.remove('hidden');
}

function cerrarModal() { document.getElementById('modal-respuesta').classList.add('hidden'); }

function guardarRespuesta() {
    const ans = document.getElementById('user-text-answer').value;
    if (ans.trim() !== "") {
        bitacoraSession.push({ f: fases[faseActual], q: preguntaActualTexto, a: ans });
        cerrarModal();
        hablar(idiomaActual === 'es' ? "Respuesta guardada" : "Answer saved");
    }
}

function abrirModalFinish() { document.getElementById('modal-finish').classList.remove('hidden'); }
function cerrarModalFinish() { document.getElementById('modal-finish').classList.add('hidden'); }

function confirmarReinicioDesdeModal() {
    cerrarModalFinish();
    if (confirm(idiomaActual === 'es' ? "¿Deseas borrar todo y empezar de cero?" : "Delete all and restart?")) {
        bitacoraSession = [];
        showMenu();
    }
}

// === 7. INTELIGENCIA ARTIFICIAL GEMINI ===
async function obtenerFeedbackIA(bitacora) {
    if (!bitacora || bitacora.length === 0) return "No hay respuestas suficientes para analizar.";

    // Preparamos el resumen de la sesión incluyendo las PREGUNTAS (Crucial para que la IA entienda el contexto)
    const contexto = bitacora.map(item => `Fase ${item.f} - Pregunta: ${item.q}\nRespuesta: ${item.a}`).join("\n\n");

    const t = traducciones[idiomaActual];

    // Formato estricto para Gemini (actualizado a 2.0 Flash)
    const requestBody = {
        contents: [{
            parts: [{
                text: t.aiPrompt + contexto
            }]
        }]
    };

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error detallado de Google:", errorData);
            const motivo = errorData.error && errorData.error.message ? errorData.error.message : "Error desconocido";
            return `El coach digital no pudo procesar la solicitud.\n\nMotivo exacto: ${motivo}\n\nPor favor, revisa tu API Key.`;
        }

        const data = await response.json();

        // Validación por si la IA bloquea la respuesta por filtros de seguridad
        if (!data.candidates || !data.candidates[0].content) {
            console.error("Respuesta bloqueada o inesperada de Gemini:", data);
            return "El coach digital no pudo generar una respuesta (posible bloqueo por seguridad).";
        }

        return data.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error("Error de conexión con Gemini:", error);
        return "Hubo un problema al conectar con el Coach IA. Revisa tu conexión, la consola F12 o tu API Key.";
    }
}

// === 8. GENERACIÓN DE PDF CON IA ===
async function generarResumenPDF() {
    const t = traducciones[idiomaActual];
    const btnExport = document.getElementById('btn-export-pdf');
    const originalText = btnExport ? btnExport.innerText : "Exportar";

    if (btnExport) {
        btnExport.innerText = t.btnExportLoading;
        btnExport.disabled = true;
    }

    try {
        // 1. Obtener feedback de la IA primero (para no bloquear la red si falla el PDF)
        let feedback = await obtenerFeedbackIA(bitacoraSession);

        // 2. Verificar que jsPDF exista en el HTML
        if (!window.jspdf) throw new Error("La librería jsPDF no está cargada en tu index.html.");
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const mazoNombre = mazoSeleccionado.titulos[idiomaActual];

        // Página 1: Respuestas
        doc.setFontSize(22);
        doc.setTextColor(41, 128, 185);
        doc.text(t.pdfTitle, 20, 20);

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`${t.pdfTheme}: ${mazoNombre} | ${t.pdfDate}: ${new Date().toLocaleDateString()}`, 20, 30);
        doc.text(`${t.pdfCoach} - Paul Rosado`, 20, 37);
        doc.line(20, 42, 190, 42);

        let y = 55;
        doc.setTextColor(0);
        bitacoraSession.forEach(item => {
            // Verificar si el bloque completo cabe en la página, si no, nueva página
            const lines = doc.splitTextToSize("R: " + item.a, 160);
            const blockHeight = 8 + (lines.length * 7) + 8;

            if (y + blockHeight > 280) { doc.addPage(); y = 20; }

            doc.setFont(undefined, 'bold');
            doc.text(`Fase ${item.f}: ${item.q}`, 20, y);
            y += 8;
            doc.setFont(undefined, 'normal');
            doc.text(lines, 25, y);
            y += (lines.length * 7) + 8;
        });

        // Página 2: IA
        doc.addPage();
        doc.setFontSize(18);
        doc.setTextColor(41, 128, 185);
        doc.text(t.pdfFeedback, 20, 20);

        doc.setFontSize(11);
        doc.setTextColor(0);

        // Limpiamos asteriscos y negritas de Markdown que jsPDF no renderiza bien
        feedback = feedback.replace(/\*\*/g, '').replace(/\*/g, '-');

        const feedbackLines = doc.splitTextToSize(feedback, 170);

        // Paginación automática para las respuestas de la IA por si son largas
        let yIA = 35;
        feedbackLines.forEach(line => {
            if (yIA > 280) {
                doc.addPage();
                yIA = 20;
            }
            doc.text(line, 20, yIA);
            yIA += 6;
        });

        doc.save(`Resumen_GROW_${mazoNombre}.pdf`);

    } catch (error) {
        console.error("Error exacto al generar el PDF o contactar a la IA:", error);
        alert(idiomaActual === 'es' ? `Error procesando: ${error.message}` : (idiomaActual === 'en' ? `Error processing: ${error.message}` : `Erro ao processar: ${error.message}`));
    } finally {
        if (btnExport) {
            btnExport.innerText = originalText;
            btnExport.disabled = false;
        }
        cerrarModalFinish();
    }
}

const traducciones = {
    es: {
        label: "Español",
        progreso: "Cargando progreso...",
        otraPregunta: "Otra Pregunta",
        responder: "Responder",
        siguienteFase: "Siguiente Fase",
        regresar: "Regresar al Menú",
        releer: "Re-leer",
        modalTitle: "Tu Respuesta",
        modalPlaceholder: "Escribe aquí o usa el micrófono...",
        cancelar: "Cancelar",
        guardar: "Guardar",
        hablar: "Idioma cambiado a español",
        finishTitle: "¡Sesión Completada!",
        finishDesc: "Has terminado el proceso.<br>¿Qué deseas hacer con tus reflexiones?",
        btnExport: "Descargar PDF",
        btnRestart: "Borrar y empezar de cero",
        btnClose: "Cerrar ventana",
        btnExportLoading: "⏳ Consultando Coach IA...",
        pdfTitle: "Resumen Sesión GROW",
        pdfTheme: "Tema",
        pdfDate: "Fecha",
        pdfCoach: "Coach",
        pdfFeedback: "Feedback Inteligente del Coach",
        aiPrompt: "Eres un Coach Profesional. Analiza estas respuestas de una sesión de coaching modelo GROW desde todas las corrientes del coaching, como el coaching ontológico (enfoque en el ser y el lenguaje), norteamericano (pragmático y orientado a resultados), europeo (enfocado en el potencial y la toma de conciencia) y el neurocoaching (basado en la neurociencia). Proporciona 3 recomendaciones breves, claras y accionables. Responde EXCLUSIVAMENTE en español, sin importar el idioma de las respuestas. No uses formato Markdown como asteriscos (**), usa guiones (-) para listas: \n\n"
    },
    en: {
        label: "English",
        progreso: "Loading progress...",
        otraPregunta: "Other Question",
        responder: "Answer",
        siguienteFase: "Next Phase",
        regresar: "Back to Menu",
        releer: "Re-read",
        modalTitle: "Your Answer",
        modalPlaceholder: "Type here or use the microphone...",
        cancelar: "Cancel",
        guardar: "Save",
        hablar: "Language changed to English",
        finishTitle: "Session Completed!",
        finishDesc: "You have finished the process.<br>What do you want to do with your reflections?",
        btnExport: "Download PDF",
        btnRestart: "Delete and start over",
        btnClose: "Close window",
        btnExportLoading: "⏳ Consulting AI Coach...",
        pdfTitle: "GROW Session Summary",
        pdfTheme: "Theme",
        pdfDate: "Date",
        pdfCoach: "Coach",
        pdfFeedback: "Smart Coach Feedback",
        aiPrompt: "You are a Professional Coach. Analyze these answers from a GROW model coaching session from all coaching currents, such as ontological coaching (focus on being and language), North American (pragmatic and results-oriented), European (focused on potential and awareness), and neurocoaching (based on neuroscience). Provide 3 brief, clear, and actionable recommendations. Answer EXCLUSIVELY in English, regardless of the language of the answers. Do not use Markdown format like asterisks (**), use hyphens (-) for lists: \n\n"
    },
    pt: {
        label: "Português",
        progreso: "Carregando progresso...",
        otraPregunta: "Outra Pergunta",
        responder: "Responder",
        siguienteFase: "Próxima Fase",
        regresar: "Voltar ao Menu",
        releer: "Ler novamente",
        modalTitle: "Sua Resposta",
        modalPlaceholder: "Escreva aqui ou use o microfone...",
        cancelar: "Cancelar",
        guardar: "Salvar",
        hablar: "Idioma alterado para português",
        finishTitle: "Sessão Concluída!",
        finishDesc: "Você terminou o processo.<br>O que deseja fazer com suas reflexões?",
        btnExport: "Baixar PDF",
        btnRestart: "Apagar e recomeçar",
        btnClose: "Fechar janela",
        btnExportLoading: "⏳ Consultando Coach IA...",
        pdfTitle: "Resumo da Sessão GROW",
        pdfTheme: "Tema",
        pdfDate: "Data",
        pdfCoach: "Coach",
        pdfFeedback: "Feedback Inteligente do Coach",
        aiPrompt: "Você é um Coach Profissional. Analise essas respostas de uma sessão de coaching do modelo GROW a partir de todas as correntes do coaching, como o coaching ontológico (foco no ser e na linguagem), norte-americano (pragmático e orientado a resultados), europeu (focado no potencial e na conscientização) e o neurocoaching (baseado na neurociência). Forneça 3 recomendações breves, claras e acionáveis. Responda EXCLUSIVAMENTE em português, independentemente do idioma das respostas. Não use o formato Markdown como asteriscos (**), use hifens (-) para listas: \n\n"
    }
};

// === 9. UTILIDADES ===
function cambiarIdioma(nuevoIdioma) {
    idiomaActual = nuevoIdioma; // Guardamos el nuevo idioma globalmente
    const t = traducciones[nuevoIdioma];

    // 1. ACTUALIZAR EL BOTÓN DEL MENÚ (Lo que mencionabas que se quedaba en inglés)
    const btnTexto = document.getElementById('current-lang-text');
    if (btnTexto) {
        btnTexto.innerText = t.label;
    }

    // 2. ACTUALIZAR TEXTO DE PROGRESO
    const progresoText = document.getElementById('progress-text');
    if (progresoText) {
        progresoText.innerText = t.progreso;
    }

    // 3. ACTUALIZAR TODOS LOS BOTONES DE LA INTERFAZ
    const btnAnswer = document.querySelector('.btn-answer');
    if (btnAnswer) btnAnswer.innerText = t.responder;
    
    const btnNextPhase = document.querySelector('.btn-next');
    if (btnNextPhase) btnNextPhase.innerText = t.siguienteFase;

    const btnNextQ = document.getElementById('btn-next-q');
    if (btnNextQ) btnNextQ.innerText = t.otraPregunta;

    const btnBack = document.getElementById('btn-back');
    if (btnBack) btnBack.innerText = t.regresar;

    const modalTitle = document.getElementById('modal-title');
    if (modalTitle) modalTitle.innerText = t.modalTitle;

    const userTextAnswer = document.getElementById('user-text-answer');
    if (userTextAnswer) userTextAnswer.placeholder = t.modalPlaceholder;

    const btnGuardarModal = document.querySelector('#modal-respuesta .btn-primary');
    if (btnGuardarModal) btnGuardarModal.innerText = t.guardar;

    const botones = document.querySelectorAll('.btn-secondary');
    botones.forEach(btn => {
        const onclick = btn.getAttribute('onclick') || '';
        if (onclick.includes('reproducirPregunta')) btn.innerText = t.releer;
        if (onclick.includes('cerrarModal')) btn.innerText = t.cancelar;
    });

    // ACTUALIZAR MODAL DE FIN DE SESIÓN
    const finishTitle = document.getElementById('finish-title');
    if (finishTitle) finishTitle.innerText = t.finishTitle;

    const finishDesc = document.getElementById('finish-desc');
    if (finishDesc) finishDesc.innerHTML = t.finishDesc;

    const btnExportPdf = document.getElementById('btn-export-pdf');
    if (btnExportPdf) btnExportPdf.innerText = t.btnExport;

    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) btnRestart.innerText = t.btnRestart;

    const btnCloseFinish = document.getElementById('btn-close-finish');
    if (btnCloseFinish) btnCloseFinish.innerText = t.btnClose;

    // RE-INICIALIZAR EL MENÚ SI ESTÁ VISIBLE
    const menuView = document.getElementById('menu-view');
    if (menuView && !menuView.classList.contains('hidden')) {
        initMenu();
    }

    // 4. ACTUALIZAR LA PREGUNTA DE LA CARTA AL INSTANTE
    if (mazoSeleccionado) {
        // Vaciamos las pilas de preguntas guardadas para forzar a que se recarguen en el nuevo idioma
        pilasPreguntas = { G: [], R: [], O: [], W: [] };

        const f = fases[faseActual];
        // Buscamos la lista de preguntas en el nuevo idioma
        const lista = mazoSeleccionado.preguntas[nuevoIdioma][f];
        // Seleccionamos una nueva (o la misma si guardaras el índice)
        preguntaActualTexto = lista[Math.floor(Math.random() * lista.length)];
        document.getElementById('question').innerText = preguntaActualTexto;
        document.getElementById('mazo-active-label').innerText = mazoSeleccionado.titulos[nuevoIdioma];
        document.getElementById('phase-label').innerText = `${UI_TEXTS[nuevoIdioma].phase}: ${f}`;
    }

    // 5. CERRAR EL MENÚ Y DAR FEEDBACK
    document.getElementById('lang-menu').classList.add('hidden');
    hablar(t.hablar);
}

function showMenu() {
    document.getElementById('game-view').classList.add('hidden');
    document.getElementById('menu-view').classList.remove('hidden');
    mazoSeleccionado = null;
    window.speechSynthesis.cancel();
}

window.onload = () => {
    initMenu();
    window.speechSynthesis.onvoiceschanged = () => { };
};

// Reconocimiento de Voz y Comandos (Sugerencia B)
function activarDictado() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Tu navegador no soporta reconocimiento de voz.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = (idiomaActual === 'en') ? 'en-US' : (idiomaActual === 'pt') ? 'pt-BR' : 'es-ES';
    
    recognition.onstart = () => {
        document.getElementById('btn-voice-input').classList.add('recording');
        hablar(idiomaActual === 'es' ? "Te escucho" : "Listening");
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const textArea = document.getElementById('user-text-answer');
        
        // COMANDOS MÁGICOS
        if (transcript.includes("guardar respuesta") || transcript.includes("save answer")) {
            guardarRespuesta();
        } else if (transcript.includes("cancelar") || transcript.includes("cancel")) {
            cerrarModal();
        } else {
            // Si no es comando, escribe en el cuadro
            textArea.value += (textArea.value ? " " : "") + transcript;
        }
    };

    recognition.onend = () => {
        document.getElementById('btn-voice-input').classList.remove('recording');
    };

    recognition.start();
}

// 1. Nueva función para actualizar la barra y los mensajes
function actualizarProgreso() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text'); // Añadiremos este ID en el HTML
    
    // Calculamos el porcentaje (de 0 a 100)
    const porcentaje = ((faseActual + 1) / fases.length) * 100;
    progressBar.style.width = `${porcentaje}%`;

    // Mensajes amigables según la fase
    let mensaje = "";
    if (faseActual === 0) mensaje = "¡Buen inicio! Vamos por el Objetivo.";
    else if (faseActual === 1) mensaje = "Entendiendo tu realidad...";
    else if (faseActual === 2) mensaje = "¡Ya falta poco! Mira tus opciones.";
    else if (faseActual === 3) mensaje = "¡Pregunta final! Vamos a la acción.";

    if (progressText) {
        progressText.innerText = mensaje;
        // Opcional: Que la app lea el mensaje de aliento
        if (vozActivada) hablar(mensaje);
    }
}

// Agrega esto al final o al inicio de tu script.js

// FUNCIÓN PARA DETECTAR LA TECLA ENTER
function verificarEnter(event) {
    // El código 13 es la tecla Enter
    if (event.key === "Enter" || event.keyCode === 13) {
        validarAcceso();
    }
}

function validarAcceso() {
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value.trim();
    
    // Credenciales (Asegúrate que coincidan con lo que quieres)
    if (user === "prosado" && pass === "Abel0122") {
        document.getElementById('login-view').style.display = 'none';
        document.getElementById('app-container').classList.remove('hidden');
        hablar("Bienvenido al sistema GROW.");
    } else {
        const error = document.getElementById('login-error');
        error.style.display = 'block';
        hablar("Credenciales incorrectas.");
    }
}

// 1. Para saltar del usuario a la contraseña
function saltarAContrasena(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita ruidos o envíos accidentales
        document.getElementById('login-pass').focus();
    }
}

// 2. Para ejecutar el botón de ingreso desde la contraseña
function ejecutarIngreso(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        validarAcceso(); // Llama a tu función existente de validación
    }
}

// --- FUNCIÓN DE CAMBIO DE TEMA ---
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    
    // Alternar la clase en el body
    body.classList.toggle('light-theme');
    
    // Cambiar el icono y dar feedback por voz
    if (body.classList.contains('light-theme')) {
        icon.innerText = "☀️";
        hablar("Modo claro activado");
        localStorage.setItem('tema', 'claro'); // Guardar preferencia
    } else {
        icon.innerText = "🌙";
        hablar("Modo oscuro activado");
        localStorage.setItem('tema', 'oscuro');
    }
}

// Cargar el tema guardado al iniciar la página
window.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado === 'claro') {
        document.body.classList.add('light-theme');
        document.getElementById('theme-icon').innerText = "☀️";
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash-screen');
    const logo1 = document.getElementById('splash-logo-1');
    const logo2 = document.getElementById('splash-logo-2');
    const login = document.getElementById('login-view');

    // SECUENCIA DE TIEMPOS
    // 1. Mostrar primer logo por 2.5 segundos (duración de la animación CSS)
    setTimeout(() => {
        logo1.classList.add('hidden');
        logo2.classList.remove('hidden'); // Aparece el icono de las cartas
        
        // 2. Mantener el icono por 1.5 segundos antes del login
        setTimeout(() => {
            splash.style.opacity = "0";
            splash.style.transition = "opacity 0.8s ease";
            
            setTimeout(() => {
                splash.classList.add('hidden');
                login.classList.remove('hidden');
                hablar("Sistema Debug Emocional listo.");
            }, 800);
        }, 1500);
    }, 2500);
});

// Abrir/Cerrar el menú flotante
function toggleLangMenu() {
    const menu = document.getElementById('lang-menu');
    menu.classList.toggle('hidden');
}

// Cerrar el menú si el usuario hace clic afuera
window.onclick = function(event) {
    if (!event.target.matches('.lang-main-btn') && !event.target.matches('#current-lang-text')) {
        const menu = document.getElementById('lang-menu');
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }
    }
}