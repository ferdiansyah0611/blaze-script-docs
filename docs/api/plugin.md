# Plugin API

this section about a plugin

## Create New Plugin

```tsx
import {
	AppType,
	BlazeType
} from "@blaze.d";

app.use(function(app: AppType, blaze: BlazeType, onReload: boolean, appKey: number){
	console.log('plugin has created.')
});
```