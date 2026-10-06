import { Contact as ContactLayout} from './layout/contact/contact';
import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Hero as HeroLayout} from './layout/hero/hero';
import { About as AboutLayout} from './layout/about/about';
import { Skills as SkillsLayout} from './layout/skills/skills';
import { Projects as ProjectsLayout} from './layout/projects/projects';
import { Services as ServicesLayout} from './layout/services/services';
import { Notfound } from './shared/notfound/notfound';
import { Dashboard } from './dashboard/dashboard';
import { About } from './dashboard/about/about';
import { Hero } from './dashboard/hero/hero';
import { Skills } from './dashboard/skills/skills';
import { Projects } from './dashboard/projects/projects';
import { Services } from './dashboard/services/services';
import { Contact } from './dashboard/contact/contact';
import { Navbar } from './dashboard/navbar/navbar';
import { Messages } from './dashboard/messages/messages';

export const routes: Routes = [
    {path:'',component:Layout,children:[
        {path:'',redirectTo:'hero',pathMatch:'full'},
        {path:'hero',component:HeroLayout},
        {path:'about',component:AboutLayout},
        {path:'skills',component:SkillsLayout},
        {path:'projects',component:ProjectsLayout},
        {path:'services',component:ServicesLayout},
        {path:'contact',component:ContactLayout},
    ]},
    {path:'dashboard',component:Dashboard,children:[
        {path:'',redirectTo:'navbar',pathMatch:'full'},
        {path:'navbar',component:Navbar},
        {path:'hero',component:Hero},
        {path:'about',component:About},
        {path:'skills',component:Skills},
        {path:'projects',component:Projects},
        {path:'services',component:Services},
        {path:'contact',component:Contact},
        {path:'contact/message',component:Messages}
    ]},
    {path:'**',component:Notfound}
];
