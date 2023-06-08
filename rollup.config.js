import clear from 'rollup-plugin-clear'
import fs from 'fs'
import path from 'path'
const pkg = JSON.parse(await fs.readFileSync(path.resolve(process.cwd(), './package.json'), {encoding: 'utf-8'}))

export default [
	{
		input: 'src/index.ts', //入口
		output: [
			{
				file: pkg.main,
				format: 'cjs'
			},
			{
				file: pkg.module,
				format: 'es'
			}
		],
		// 声明它的外部依赖，可以不被打包进去。
		external: [],
		// 监听文件的变化，重新编译，只有在编译的时候开启 --watch 才生效。
		watch: {
			include: 'src/**'
		},
		plugins: [
			clear({
				targets: ['dist']
			})
		]
	}
]
