import React, { useEffect, useState } from 'react';
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
  const [comunidades, setComunidades] = useState([]);
  const [seguidores, setSeguidores] = useState([]);
  const githubUser = 'pconeglian';  
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];
  /*
    userEffect, usado para executar código toda vez que houver uma ação na aplicação.
    << - Um paramêtro (array vazio) é utilizado para executar uma vez apenas.
  */
  useEffect(() => {
    /* Fecth seguidores */
    fetch('https://api.github.com/users/peas/followers')
    .then((respostaDoServidor) => {
      return respostaDoServidor.json();
    })
    .then((respostaCompleta) => {
      setSeguidores(respostaCompleta);
    });

    /* Fetch comunidades */
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'ddf3fc812ab790ceb8ae91e13dfb57',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({"query": `query { 
        allCommunities {
          id
          title
          imageUrl
          urlslug
          creatorSlug
        }
      }`})
    })
    .then((resposta) => { /* Ou INLINE = .then((response) => response.json() - onde não é preciso utilizar o return */
      return resposta.json();
    })
    .then((respostaCompleta) => {
      setComunidades(respostaCompleta.data.allCommunities);
    })
  }, []); /* << */
  
  function ProfileRelationsBox(props) {
    console.log(props);
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {props.title} ({props.items.length})
        </h2>
        <ul>
          {              
            props.items.slice(0,6).map((itemAtual) => {              
              return (
                <li key={`${itemAtual.id}_${itemAtual.title}`}>
                  <a href={itemAtual.html_url} title={`Visite o perfil de ${itemAtual.login}`}>
                    <img src={itemAtual.avatar_url} alt={`Avatar ${itemAtual.login}`} encoding="async" />
                    <span>{itemAtual.login}</span>
                  </a>
                </li>
              )
            })
          }
        </ul>
        <hr />
        <a href="seguidores" className="boxLink">Ver Todos</a>
      </ProfileRelationsBoxWrapper>
    )
  }

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
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('imageUrl'),
                  urlslug: dadosDoForm.get('urlslug'),
                  creatorSlug: dadosDoForm.get('creatorSlug')
                }

                fetch('api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'  
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json();                  
                  const comunidadesAtualizadas = [...comunidades, dados.registroCriado]; /* ...  = spread */
                  setComunidades(comunidadesAtualizadas);
                });

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
                  name="imageUrl"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <div>
                <input 
                  type="text"
                  placeholder="Forneça uma URL amigável"
                  name="urlslug"
                  aria-label="Forneça uma URL amigável"
                />
              </div>
              <div>
                <input 
                  type="text"
                  placeholder="Username do autor"
                  name="creatorSlug"
                  aria-label="Username do autor"
                />
              </div>
              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>        
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          {/* SEGUIDORES */}
          <ProfileRelationsBox title="Seguidores" items={seguidores} />

          {/* COMUNIDADES */}
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {              
                comunidades.slice(0,6).map((itemAtual) => {
                  return (
                    <li key={`${itemAtual.id}`}>
                      <a href={`community/${itemAtual.urlslug}`}>
                        <img src={itemAtual.imageUrl} alt={`Avatar ${itemAtual.title}`} encoding="async" />
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

          {/* PESSOAS DA COMUNIDADES */}
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
