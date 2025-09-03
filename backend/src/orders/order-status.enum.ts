/**
 * Énumération des statuts possibles pour une commande
 */
export enum OrderStatus {
  // La commande a été créée mais n'a pas encore été traitée par le restaurant
  PENDING = 'PENDING',
  
  // Le restaurant a accepté la commande
  CONFIRMED = 'CONFIRMED',
  
  // Le restaurant prépare la commande
  PREPARING = 'PREPARING',
  
  // La commande est prête à être récupérée par le livreur ou le client
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
  
  // La commande est en cours de livraison
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  
  // La commande a été livrée avec succès
  DELIVERED = 'DELIVERED',
  
  // La commande a été annulée
  CANCELLED = 'CANCELLED',
  
  // La commande a été refusée par le restaurant
  REJECTED = 'REJECTED',
  
  // La commande a expiré (temps d'attente trop long)
  EXPIRED = 'EXPIRED',
  
  // La commande a échoué (problème de paiement, etc.)
  FAILED = 'FAILED',
}

/**
 * Vérifie si une transition entre deux statuts est valide
 * @param fromStatus Statut actuel
 * @param toStatus Nouveau statut demandé
 * @returns boolean indiquant si la transition est autorisée
 */
export function isValidStatusTransition(fromStatus: OrderStatus, toStatus: OrderStatus): boolean {
  // Une commande ne peut pas changer de statut si elle est déjà dans un état terminal
  const terminalStatuses = [
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED,
    OrderStatus.REJECTED,
    OrderStatus.EXPIRED,
    OrderStatus.FAILED
  ];
  
  if (terminalStatuses.includes(fromStatus)) {
    return false;
  }
  
  // Définition des transitions autorisées
  const allowedTransitions = {
    [OrderStatus.PENDING]: [
      OrderStatus.CONFIRMED,    // Le restaurant accepte la commande
      OrderStatus.REJECTED,     // Le restaurant refuse la commande
      OrderStatus.CANCELLED,    // L'utilisateur annule la commande
      OrderStatus.EXPIRED,      // La commande expire (pas de réponse du restaurant)
      OrderStatus.FAILED,       // Échec du paiement
    ],
    [OrderStatus.CONFIRMED]: [
      OrderStatus.PREPARING,    // Le restaurant commence la préparation
      OrderStatus.CANCELLED,    // Annulation par l'utilisateur ou le restaurant
      OrderStatus.FAILED,       // Problème lors de la préparation
    ],
    [OrderStatus.PREPARING]: [
      OrderStatus.READY_FOR_PICKUP, // La commande est prête à être récupérée
      OrderStatus.CANCELLED,    // Annulation exceptionnelle
      OrderStatus.FAILED,       // Problème lors de la préparation
    ],
    [OrderStatus.READY_FOR_PICKUP]: [
      OrderStatus.OUT_FOR_DELIVERY, // Un livreur prend en charge la livraison
      OrderStatus.DELIVERED,    // Le client récupère directement au restaurant
      OrderStatus.CANCELLED,    // Annulation exceptionnelle
    ],
    [OrderStatus.OUT_FOR_DELIVERY]: [
      OrderStatus.DELIVERED,    // Livraison réussie
      OrderStatus.FAILED,       // Problème lors de la livraison
    ],
    // Les autres statuts sont terminaux et ne peuvent pas être modifiés
  };
  
  // Si le statut actuel n'est pas dans la liste des transitions autorisées,
  // on considère qu'aucune transition n'est possible
  if (!allowedTransitions[fromStatus]) {
    return false;
  }
  
  // Vérifier si la transition est autorisée
  return allowedTransitions[fromStatus].includes(toStatus);
}

/**
 * Vérifie si un statut est terminal (la commande ne peut plus évoluer)
 * @param status Statut à vérifier
 * @returns boolean indiquant si le statut est terminal
 */
export function isTerminalStatus(status: OrderStatus): boolean {
  return [
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED,
    OrderStatus.REJECTED,
    OrderStatus.EXPIRED,
    OrderStatus.FAILED
  ].includes(status);
}

/**
 * Obtient la liste des statuts dans un ordre logique pour l'affichage
 * @returns Tableau des statuts ordonnés
 */
export function getOrderedStatuses(): OrderStatus[] {
  return [
    OrderStatus.PENDING,
    OrderStatus.CONFIRMED,
    OrderStatus.PREPARING,
    OrderStatus.READY_FOR_PICKUP,
    OrderStatus.OUT_FOR_DELIVERY,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED,
    OrderStatus.REJECTED,
    OrderStatus.EXPIRED,
    OrderStatus.FAILED,
  ];
}
