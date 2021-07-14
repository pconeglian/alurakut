import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(prop) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${prop.githubUser}.png`} width="209" height="209" decoding="async" alt="Avatar" style={{ borderRadius: '8px'}} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${prop.githubUser}`}>
          @{prop.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([
    {
      id: new Date().toISOString(),
      title: 'Lord of the Rings',
      image: 'https://lyricstranslate.com/files/styles/large/public/The-lord-of-the-rings-the-return-of-the-king-59b7d7a3775bf.jpg'
    },
    {
      id: new Date().toISOString(),
      title: 'Castlevania SOTN',
      image: 'https://img.discogs.com/G0hS_HpgCDg3Mq7u24aLnCWD7jk=/fit-in/300x300/filters:strip_icc():format(webp):mode_rgb():quality(40)/discogs-images/R-10294694-1494818696-1375.jpeg.jpg'
    },
    {
      id: new Date().toISOString(),
      title: 'Back to The Future',
      image: 'https://i1.wp.com/theseconddisc.com/wp-content/uploads/Back-to-the-Future.jpg?resize=300%2C300&ssl=1'
    },
    {
      id: new Date().toISOString(),
      title: 'Pareidolia',
      image: 'https://conteudo.imguol.com.br/c/bol/fotos/75/2017/04/28/1-a-impressao-que-temos-de-ver-rostos-nos-mais-variados-lugares-e-um-fenomeno-psicologico-chamado-pareidolia-a-palavra-vem-do-grego-para-que-significa-ao-lado-de--eidolon-imagem-1493408500438_956x500.jpg'
    },
    {
      id: new Date().toISOString(),
      title: 'Fender Precision',
      image: 'https://rockschool.ameb.edu.au/wp-content/uploads/2014/04/bass-exams-tile-1-300x300.jpg'
    },
    {
      id: new Date().toISOString(),
      title: '80\'s Horror Movies',
      image: 'https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/b/3/0/1/f601-c998-48ed-8bab-a27a01158527.jpg'
    },
    {
      id: new Date().toISOString(),
      title: 'Alurakut',
      image: 'https://cdn2.downdetector.com/static/uploads/c/300/582a8/download-2_xNf9njH.png'
    }
  ]);
  const githubUser = 'pconeglian';  
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">Bem-vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={
              function handleCreateCommunity(e) {
                e.preventDefault();
                
                /* get data from form */
                const dadosDoForm = new FormData(e.target);
                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image')
                }

                const comunidadesAtualizadas = [...comunidades, comunidade]; /* ...  = spread */
                setComunidades(comunidadesAtualizadas);                
              }
            }>
              <input type="hidden" name="comunidades" value={comunidades} />
              <div>
                <input 
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input 
                  type="text"
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>          
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {              
                comunidades.slice(0,6).map((itemAtual) => {
                  return (
                    <li key={`${itemAtual.id}_${itemAtual.title}`}>
                      <a href={`comunidade/${itemAtual.title.toLowerCase()}`}>
                        <img src={itemAtual.image} alt={`Avatar ${itemAtual.title}`} encoding="async" />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
            <hr />
            <a href="comunidades" className="boxLink">Ver Todos</a>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>            
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {              
                pessoasFavoritas.slice(0,6).map((itemAtual) => {
                  return (
                    <li key={itemAtual}>
                      <a href={`users/${itemAtual}`}>
                        <img src={`https://github.com/${itemAtual}.png`} alt={`Avatar ${itemAtual}`} encoding="async" />
                        <span>{itemAtual}</span>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
            <hr />
            <a href="/" className="boxLink">Ver Todos</a>
          </ProfileRelationsBoxWrapper>          
        </div>
      </MainGrid>
    </>
  )
}
