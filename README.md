# Exchange Exterior RFB
Lib to produce the report required by [IN 1888](http://normas.receita.fazenda.gov.br/sijut2consulta/link.action?visao=anotado&idAto=100592) from Receita Federal do Brasil in accordance to its [manuals and layouts](https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/documentos-tecnicos/criptoativos/leiaute-criptoativos-exchanges-exterior/view).

## Installing
### [YARN](https://yarnpkg.com/)
- Command: `yarn add exchanges-rfb`
### [NPM](http://npmjs.org/)
- Command: ```npm install exchanges-rfb --save```

## Usage Example

```js
import Exchange from "exchanges-rfb"

const MyEx = new Exchange({
  exchange_name: "Binance",
  exchange_country: "US",
  exchange_url: "https://binance.com"
})

MyEx.addBuyOperation({
    date: '20/8/2022',
    brl_value: '112,24',
    brl_fees: '1,25',
    coin_symbol: 'ETH',
    coin_quantity: '0.01'
})

console.log(MyEx.exportFile())
```

We included an example output file [here](test/example-output).

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
