export default {
  items: [
    {
      name: 'Home',
      url: '/',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'idaho',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Boise Whitewater Park',
      url: '/wave/13206000',
      icon: 'icon-drop',
    },
    {
      name: "Kelly's Whitewater Park",
      url: '/wave/13245000',
      icon: 'icon-pencil',
    },
    {
      name: 'Payette @ Banks',
      url: '/wave/13246000',
      icon: 'icon-pencil',
    },
    {
      divider: true,
    },
  ],
};
