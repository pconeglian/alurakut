import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(prop) {
  return (
    <Box>
      <img src={`https://github.com/${prop.githubUser}.png`} width="209" height="209" decoding="async" alt="Avatar" style={{ borderRadius: '8px'}} />
    </Box>
  )
}

export default function Home() {

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
      <AlurakutMenu />
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
            O que você precisa fazer?
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {              
                pessoasFavoritas.map((itemAtual) => {
                  return (
                    <li>
                      <a href={`users/${itemAtual}`} key={itemAtual}>
                        <img src={`https://github.com/${itemAtual}.png`} alt={`Avatar ${itemAtual}`} encoding="async" />
                        <span>{itemAtual}</span>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Minhas Comunidades
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
