'use client';

import PropTypes from 'prop-types';

export default function IconLink({ href, icon, className = '' }) {
  return (
    <a href={href} target='_blank' rel='noreferrer' className={className}>
      {icon}
    </a>
  );
}

IconLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequireds,
  className: PropTypes.string,
};
