# name: discourse-topic-featured-link-extra
# about: Extra support and configuration for topic featured link on Discourse
# version: 0.1
# authors: Erick Guan (fantasticfears@gmail.com)

PLUGIN_NAME = 'discourse-topic-featured-link-extra'.freeze

enabled_site_setting :topic_featured_link_enabled

after_initialize do
  Email::Styles.register_plugin_style do |fragment|
    fragment.css("a.topic-featured-link").each do |e|
      e['style'] = SiteSetting.topic_featured_link_extra_digest_email_anchor_style
    end
  end
end
