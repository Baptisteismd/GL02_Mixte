var CRU = function (ue, statut, type, place, horaire, sousgroupe, salle) {
	this.ue = ue;
	this.statut= statut,
	this.type= type,
	this.place= place,
	this.horaire= horaire,
	this.sousgroupe= sousgroupe,
	this.salle= salle;
};

module.exports = CRU;