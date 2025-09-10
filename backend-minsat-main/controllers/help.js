import {getServiceClass,uagroup,serviceidentifier,offer, usagecounters} from '../models/help.js';


export const getServiceClassController = async (req, res) => {

  try {
    const sc = await getServiceClass(); // Appel au modèle
    console.log('🗄️ Service class:', sc);

    if (sc.length === 0) {
      console.log('⚠️ Aucun Service class trouvé');
      return res.status(404).json({ message: 'Aucun Service class trouvé' });
    }
    return res.status(200).json(sc);
  } catch (error) {
    console.error('❌ Erreur dans getServiceClass:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
  }
};
export const uagroupController = async (req, res) => {

  try {
    const ua = await uagroup(); // Appel au modèle
    

    if (ua.length === 0) {
     
      return res.status(404).json({ message: 'Aucun uagroup trouvé' });
    }
    return res.status(200).json(ua);
  } catch (error) {
    console.error('❌ Erreur dans getServiceClass:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
  }}
export const serviceidentifierController = async (req, res) => {

  try {
    const si = await serviceidentifier(); // Appel au modèle
    

    if (si.length === 0) {
     
      return res.status(404).json({ message: 'Aucun SI trouvé' });
    }
    return res.status(200).json(si);
  } catch (error) {
    console.error('❌ Erreur dans SI:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
  }
};
export const offerController = async (req, res) => {

  try {
    const si = await offer(); // Appel au modèle
    
    if (si.length === 0) {
     
      return res.status(404).json({ message: 'Aucun offer trouvé' });
    }
    return res.status(200).json(si);
  } catch (error) {
    console.error('❌ Erreur dans offer:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
  }
};

export const usagecountersController = async (req, res) => {
  try {
    const uc = await usagecounters(); 
    if (uc.length === 0) {
      return res.status(404).json({ message: 'Aucun offer trouvé' });
    }
    return res.status(200).json(uc);
  } catch (error) {
    console.error('❌ Erreur dans offer:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
  }
};