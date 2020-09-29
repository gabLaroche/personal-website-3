import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document schemas
import aboutPage from './documents/aboutPage';
import homepage from './documents/homepage';
import project from './documents/project';
import projectsPage from './documents/projectsPage';
import singleProjectPage from './documents/singleProjectPage';
import siteConfig from './documents/siteConfig';
import skill from './documents/skill';
import usesPage from './documents/usesPage';

// Object types
import link from './objects/link';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
      siteConfig,
      project,
      skill,
      homepage,
      projectsPage,
      singleProjectPage,
      aboutPage,
      usesPage,
      link
  ])
})
