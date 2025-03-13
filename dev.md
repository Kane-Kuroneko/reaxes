如何发布(参数顺序无关):  
`$ npm run publish <packageName> <tag> <releaseType>`

比如预发布:  
`$ npm run publish reaxes prerelease beta`

| 参数          | 有效值                                                                                                                                                                      |
|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| packageName | `reaxes` \| `reaxes-react` \| `reaxes-vue2` \| `reaxes-vue3` \| `reaxes-preact` \| `reaxes-angular` \| `reaxes-toolkit` \| `reaxes-utils` \| `reaxels/*` \| `refaxels/*` |
| tag         | `NpmTag:'alpha' \| 'beta' \| 'latest' \| 'next' \| 'rc' \| 'dev'`                                                                                                        |
| releaseType | `major` \| `premajor` \| `minor` \| `preminor` \| `patch` \| `prepatch` \| `prerelease`                                                                                  |

