# Guia de Publicação na Vercel - Giga Mix

Como o site agora usa Next.js e TiDB, siga estes passos para publicar:

## 1. Configurar Variáveis de Ambiente na Vercel
No painel da Vercel, vá em **Settings > Environment Variables** e adicione:

*   **`DATABASE_URL`**: 
    `mysql://42sJpQxxzwhtP9X.root:fKCVjA4zjb3h5CmX@gateway01.us-east-1.prod.aws.tidbcloud.com:4000/giga_mix?sslaccept=strict`

## 2. Comando de Build
A Vercel detectará o Next.js automaticamente. O comando padrão `npm run build` funcionará corretamente.

## 3. Otimização Mobile (96% dos acessos)
O site foi otimizado com:
*   **Grid de 2 colunas no mobile**: Para melhor visualização dos produtos.
*   **Carrinho Full Screen**: Melhor usabilidade em telas pequenas.
*   **Interações via WhatsApp**: Botões grandes e fáceis de clicar com o polegar.
*   **Safe Area**: Suporte para o "notch" e barra inferior de iPhones.

## 4. Banco de Dados
O banco de dados já foi criado e populado no seu TiDB Cloud. Não é necessário rodar o seed novamente na Vercel, a menos que você queira resetar os dados.

---
**Dica:** Conecte seu repositório do GitHub à Vercel para que cada "git push" publique o site automaticamente.
