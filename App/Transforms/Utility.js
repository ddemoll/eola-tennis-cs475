
export const parseDateIntoComponents = (dateString) => {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let monthInt = parseInt(dateString.substr(dateString.indexOf("-")+1, 2))-1;
  let month = months[monthInt];

  let dateInMonth = parseInt(dateString.substr(dateString.lastIndexOf("-")+1, 2));

  return {
    month,
    dateInMonth
  }

}

export const extractYouTubeID = (url) => {
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}
