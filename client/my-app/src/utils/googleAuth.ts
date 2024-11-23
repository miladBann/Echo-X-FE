import { loadGapiInsideDOM } from 'gapi-script';

const initGoogleAPI = async (clientId: string): Promise<void> => {
  try {
    const gapi = await loadGapiInsideDOM();
    gapi.load('client:auth2', () => {
      gapi.auth2.init({
        client_id: clientId,
      });
    });
  } catch (error) {
    console.error('Failed to initialize Google API', error);
  }
};

export default initGoogleAPI;
