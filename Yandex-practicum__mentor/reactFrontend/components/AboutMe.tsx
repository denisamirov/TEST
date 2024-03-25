import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { Registration } from './Registration';

export const AboutMe = () => {
  return (
    <>
    <Row>
        <Col>
            <Card className="aboutMe">
                <Card.Img variant="top" src="itme.jpg" />
                <Card.Body>
                    <Card.Title>Привет, меня зовут Денис!</Card.Title>
                    <Card.Text>
                        Это моё лучшее селфи со школы. Во всех резюме и анкетах я ставлю именно это фото
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
        <Col>
        <div id="textAboutMe">
            <h4>В школе...</h4>
            В школе я не увлекался программированием, потому что у нас не было опытного наставника в школе по этому предмету. Я из деревни в Оренбургской области, наверное, это многое объясняет. Хотя мне очень нравился Pascal. У нас в классе были ребята, которые были сильнее меня в физико-математических науках. Но задачи, которые надо было решить на Pascal, я выполнял быстрее всех в классе.
            <h4>В ВУЗе...</h4>
            По-настоящему увлекаться программированием я начал в ВУЗе, когда устроился работать в Молодежный Бизнес Инкубатор. Там приходилось много работать с документаций и она не всегда была актуализирована. Многие процессы были не оптимизированы. Я изучил Exel, начал писать VBA скрипты, оптимизирующие работу сотрудников, вместе с начальником восстановил аткуальность данных личных кабинетов студентов. 
    ...Починил все, что только можно было:) 
            <h4>Работа в Лицее...</h4>
    Дальше я начал изучать Python и Django. В этот период меня пригласили преподавать робототехнику и программирование в Лицей ЖК Царево. 

    Нашими лучшими проектами с ребятами стали: 
        Система автоматизированного полива(Python + Arduino);
        Система мониторинга за солнечными панелями(Django + MySQL + Arduino), также получили патент;
        Веб-сервис "Читательский дневник"(Django + PostgreSQL);

            <h4>Работа в ООО "ТатАИСЭнерго"...</h4>
    Во время работы дежурным инженером АСУТП ООО "ТатАИСЭнерго" я разработал PWA сайт, в котором собрал всю важную информацию, которая до меня была разрознена. Меня повысили, и теперь я там больше не работаю, но этим ресурсом продолжают пользоваться и сейчас.

    Затем в декабре 2022 начал изучать Node.js и React.js. Один из моих лучших проектов - это система контроля за состоянием устройств LoraWan  для ООО "ТатАИСЭнерго". С помощью моей системы сотрудники могут оперативно узнать, какое устройство не на связи, расшифровать его посылку, узнать, где оно находится и проложить к нему маршрут, и я продолжаю улучшать это приложение по желаниям пользователей. 
            <h4>Итог...</h4>
    Программирование мне нравится, потому что с помощью приложений можно автоматизирвоать рутину, как следствие потратить больше времени на созидание, общение, создание нового и т.п. 
        </div>
        </Col>
    </Row>
    <Row>
        <Col>
            <Registration />
        </Col>
    </Row>
    </>
  )
}
