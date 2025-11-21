const sections = [
  {
    title: "Collecte des données",
    paragraphs: [
      "Nous collectons uniquement les informations nécessaires au suivi de vos commandes (nom, prénom, coordonnées et préférences produits).",
      "Aucune donnée bancaire n'est stockée sur nos serveurs ; les paiements sont délégués à nos prestataires certifiés.",
    ],
  },
  {
    title: "Utilisation",
    paragraphs: [
      "Vos informations servent à traiter vos commandes, personnaliser vos recommandations et vous prévenir des nouveautés pertinentes.",
      "Nous n'envoyons des communications marketing que si vous y avez consenti et vous pouvez vous désabonner à tout moment.",
    ],
  },
  {
    title: "Vos droits",
    paragraphs: [
      "Vous pouvez demander l'accès, la rectification ou la suppression de vos données en nous écrivant à privacy@ateliercafe.dev.",
      "Nous répondons à toute demande sous 30 jours et vous accompagnons pour assurer la portabilité de vos données.",
    ],
    list: [
      "Droit d'accès et de rectification",
      "Droit d'opposition et de limitation",
      "Droit à l'effacement et à la portabilité",
    ],
  },
];

function ConfidentialitePage() {
  return (
    <div className="page page--narrow">
      <header className="policy-header panel">
        <p className="policy-header__eyebrow">Protection des données</p>
        <h1>Politique de Confidentialité</h1>
        <p>
          Nous détaillons ici la manière dont Atelier Café collecte, protège et
          utilise vos données personnelles afin d'assurer une expérience d'achat
          transparente et sereine.
        </p>
      </header>

      {sections.map((section) => (
        <section key={section.title} className="policy-section panel">
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.list ? (
            <ul>
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}

export default ConfidentialitePage;
