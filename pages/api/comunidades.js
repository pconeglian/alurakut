import { SiteClient} from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

  if (request.method === 'POST') {
    const TOKEN = '1abb279bddbc5116df1e5d09bfc0a0';
    const client = new SiteClient(TOKEN);

    // Validar os dados antes
    const registroCriado = await client.items.create({
      itemType: '968620', //id do model Community do DatoCMS
      ...request.body,
    })

    response.json({
      dados: 'Algum dado qualquer',
      registroCriado: registroCriado
    })

    return;
  }

  response.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST tem!'
  });
}