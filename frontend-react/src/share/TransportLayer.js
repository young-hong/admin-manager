import http from './http'

// export const getToken = async (deviceCode) => {
//   let res = await http.post('/oauth/device_authorization',{
//     "device_code": `${deviceCode}`,
//     "client_id": "s365-device",
//     "client_secret": "19335107-dad3-4fc3-8b66-b05a38b45fd2"
//   })
//   if (res) {
//     sessionStorage.setItem('token',res.data.access_token)
//   }
//   return res.data
// }

// export const getSpaces = async () => {
//   let res = await http.get(`/v1/companies/5f32502be0f6a257704c1585/spaces`)
//   return res.data
// }

// export const getDevice = async () => {
//   let res = await http.get('/v1/device')
// }

export const signin = async (user) => {
  let result = await http.post('/api/users/signin', user);
  return result;
}

export const getUsers = async () => {
  let result = await http.get('/api/users/userList');
  return result.data;
}

export const deleteUser = async (id) => {
  let result = await http.delete(`/api/users/delete`, id);
  return result.data;
}

export const addUser = async (user) => {
  let result = await http.post('/api/users/signup', user);
  return result.data;
}

export const isAuth = async () => {
  let result = await http.get('/api/users/isAuth');
  return result.data;
}

export const getPositions = async () => {
  let result = await http.get('/api/positions/positionList');
  return result.data;
}

export const addPosition = async (position) => {
  let result = await http.post('/api/positions/addPosition', position);
  return result.data;
}

export const deletePosition = async (id) => {
  let result = await http.delete('/api/positions/deletePosition', id);
  return result.data;
}

export const updatePosition = async (position) => {
  let result = await http.patch('/api/positions/updatePosition', position);
  return result.data;
}