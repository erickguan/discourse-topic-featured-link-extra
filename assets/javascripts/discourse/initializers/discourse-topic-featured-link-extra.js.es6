import { withPluginApi } from 'discourse/lib/plugin-api';
import { default as computed, on, observes } from 'ember-addons/ember-computed-decorators';
import { addFeaturedLinkMetaDecorator } from 'discourse/lib/render-topic-featured-link';

function oneboxed($elem) {
  return $elem.children('p').children('a').length === 0;
}

function initializeWithApi(api) {
  const siteSettings = api.container.lookup('site-settings:main');

  if (!siteSettings.topic_featured_link_enabled) {
    return;
  }

  addFeaturedLinkMetaDecorator((meta) => {
    if (siteSettings.topic_featured_link_extra_link_ref) {
      const connector = meta.href.indexOf('?') === -1 ? '?' : '&';
      meta.href = `${meta.href}${connector}ref=${siteSettings.topic_featured_link_extra_link_ref}`;
    }
    return meta;
  });
}

export default {
  name: 'discourse-topic-featured-link-extra',
  initialize() {
    withPluginApi('0.5', initializeWithApi);
  }
};
