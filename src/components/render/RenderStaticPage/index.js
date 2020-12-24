import * as React from 'react';
const h = React.createElement;
const RenderStaticPage = ({pageDes}) => {
  return h(
    pageDes.container,
    {...pageDes.props},
    pageDes.children.map((item) => h(item.itemType, {...item.props})),
  );
};

export default RenderStaticPage;
