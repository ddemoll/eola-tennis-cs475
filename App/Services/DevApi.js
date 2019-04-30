// a library to wrap and simplify api calls
import apisauce from 'apisauce'
//import { Storage } from 'aws-amplify';
import Api from './Api'
//import PayPal from '../Lib/PayPal'

const config = require('../../config/config.json');

// our "constructor"
const create = (baseURL = 'http://192.168.0.4:' + (config.devapi.serverport) + '/') => {
	console.log("starting up dev api");
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  //ANOUNCEMENTS
  const getAnnouncements = () => api.get('announcements').then(response => response.data)
  /*
  const createAnnouncement = (data) => require('../Lib/util').createPost_DEV(data, 'announcements', api)
  const updateAnnouncement = (data) => require('../Lib/util').updatePost_DEV(data, 'announcements', api)
  const deleteAnnouncement = (id, picKey) => {
    return Storage.remove(picKey, {level: 'public'}).then(result => {
      return api.delete(`announcements/${id}`).then(response => ({ok: true})).catch(error => ({ok: false}))
    })
    .catch(err => ({ok: false}));

  }
  */

  //FEATURED PLAYERS
  const getFeatured = () => api.get('featured').then(response => response.data)
  /*
  const createFeatured = (data) => require('../Lib/util').createPost_DEV(data, 'featured', api)
  const updateFeatured = (data) => require('../Lib/util').updatePost_DEV(data, 'featured', api)
  const deleteFeatured = (id, picKey) => {
    return Storage.remove(picKey, {level: 'public'}).then(result => {
      return api.delete(`featured/${id}`).then(response => ({ok: true})).catch(error => ({ok: false}))
    })
    .catch(err => ({ok: false}));
  }
  */

  //EVENTS
  const getEvents = () => api.get('events').then(response => ({data: response.data, ok: true})).catch(error => ({ok: false}))
  const createEvent = (data) => api.post('events', data).then(response => ({id: response.data.id, ok: true})).catch(error => ({ok: false}))
  const updateEvent = (data) => api.put('events', data).then(response => ({data: response.data, ok: true})).catch(error => ({ok: false}))
  const deleteEvent = (id) => api.delete(`events/${id}`).then(response => ({ok: true})).catch(error => ({ok: false}))


  //CONTACTS
  const getContacts = () => api.get('contacts').then(response => response.data)

  //RANKINGS
  const getRankings = () => api.get('rankings').then(response => ({data: response.data, ok: true})).catch(error => ({ok: false}))
  /*
  const createRanking = (data) => api.post('rankings', {id: data}).then(response => ({data: response.data, ok: true})).catch(error => ({ok: false}))
  const deleteRanking = (id) => api.delete(`rankings/${id}`).then(response => ({data: response.data, ok: true})).catch(error => ({ok: false}))
  const searchPlayer = (searchString) => Api.get(`https://universaltennis.com/quicksearch/players?query=${encodeURIComponent(searchString)}`).then(response => ({data: response, ok: true})).catch(error => ({ok: false}))
  */
  //STORE

  const getStore = () => api.get('store').then(response => response.data)
  /*
  const createStore = (data) => {
    let paypal = PayPal.create();
    let params = {
      BUTTONCODE: 'HOSTED',
      BUTTONTYPE: 'BUYNOW',
      L_BUTTONVAR0: 'business=TQUNVUKMLNRGE',
      L_BUTTONVAR1: 'item_name='+data.text.substring(0,20),
      L_BUTTONVAR2: 'amount='+data.price,
      L_BUTTONVAR3: 'currency_code=USD'
    }
    return paypal.request('BMCreateButton', params).then((result) => {
      let decodedResult = decodeURIComponent(result)
      let targetStr = "EMAILLINK=";
      let paypalURL = decodedResult.substring(decodedResult.indexOf(targetStr)+targetStr.length);
      return require('../Lib/util').createPost_DEV({...data, paypalURL}, 'store', api).then(res => ({...res, paypalURL}))
    }).catch((err) => {
      return {ok: false}
    });

  }
  const updateStore = (data) => require('../Lib/util').updatePost_DEV(data, 'store', api)
  const deleteStore = (id, picKey) => {
    return Storage.remove(picKey, {level: 'public'}).then(result => {
      return api.delete(`store/${id}`).then(response => ({ok: true})).catch(error => ({ok: false}))
    })
    .catch(err => ({ok: false}));

  }
  */
  
  const getClasses = () => api.get('classes').then(response => response.data)

  
  const requestWaiverSign = () => api.get('signwaiver').then(response => response.data); 
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2

    getAnnouncements,
    /*
    createAnnouncement,
    deleteAnnouncement,
    updateAnnouncement,
    */

    getFeatured,
    /*
    createFeatured,
    updateFeatured,
    deleteFeatured,
    */

    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,

    getContacts,

    getRankings,
    /*
    createRanking,
    deleteRanking,
    searchPlayer,
    */

    getStore,
    /*
    createStore,
    deleteStore,
    updateStore,
    */
	
	getClasses
	
  }
}

// let's return back our create method as the default.
export default {
  create
}
