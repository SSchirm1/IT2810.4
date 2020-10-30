[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.idi.ntnu.no/#https://gitlab.stud.idi.ntnu.no/it2810-h20/team-72/prosjekt-3/) 


**Components**

The components were mainly implemented as functional components. In comparison with class components, they have a shorter and simpler syntax, which makes the code more readable, 
easier to understand and easier to test. By using hooks, the functional components achieves the same functionality as class components. An advantage with using hooks
was that we could reuse stateful logic without changing the component hierarchy. 

**API**

**File Structure**
    
The components are located within the /src/ folder, where all of the UI components are stored
in the /components/ subfolder. Within the /components/ folder, there are separate folders for different components, and each of these folders has an index.tsx file which stores
a functional component whose name coincides with the folder name. Some of the component folders contain multiple components, where the ones not stored in the index.tsx files
are subcomponents of the component in the index.tsx file.

The self-made hooks are stored in the /hooks/ folder, and the shared state management files (store.ts, reducers.ts, actions.ts etc.) are stored within
the /store/ folder. 

**State and props**

In order to handle state and state-changes within our components, we used useState and useEffect. Most of the components show usage of props. In order to handle global
state, we used Redux. 

**Testing**


**References**