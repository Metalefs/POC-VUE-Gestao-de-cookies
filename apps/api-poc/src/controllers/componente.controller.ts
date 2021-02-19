import { Controller, Get, Query, Req } from '@nestjs/common';
import { PreferenciasComponente } from '../../../../libs/shared/src/interfaces';
import { ComponenteService } from '../services/componente.service';
// import { CookieScan } from '../services/cookieScan.service';
import { UsuarioService } from '../services/usuario.service';

@Controller()
export class ComponenteController {
  constructor(
    private readonly componenteService: ComponenteService,
    // private readonly cookieScan: CookieScan,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Get('getTextoBarraComponente')
  getTextoBarraComponente(@Query() query): string {
    return this.componenteService.getTextoBarraComponente();
  }
  @Get('getVisaoGeralDePrivacidade')
  getVisaoGeralDePrivacidade(@Query() query): string {
    return this.componenteService.getVisaoGeralDePrivacidade();
  }
  @Get('getCookieDeclaration')
  getCookieDeclaration(@Query() query): string {
    return this.componenteService.getCookieDeclaration();
  }
  @Get('getPrivacyPolicy')
  getPrivacyPolicy(@Query() query): string {
    return this.componenteService.getPrivacyPolicy();
  }
  @Get('getUserPreferences')
  async getUserPreferences(@Query() query): Promise<PreferenciasComponente> {
    const UserID = await (await this.usuarioService.ObterPorAPI_KEY(query.KEY))
      .identificador;
    return this.componenteService.getUserPreferences(UserID);
  }
  @Get('cookieScan')
  async CookieScan(@Req() req) {
    const key = req.headers['component-key'];
    return await (await this.usuarioService.ObterPorAPI_KEY(key)).dominios[0]
      .cookies;

    // const origin = req.headers['origin'];  // próxima versão
    // const endereco =
    //   (await this.usuarioService.ObterPorAPI_KEY(key)).dominios.find((x) =>
    //     x.endereco.includes(origin),
    //   ).endereco || origin;

    // return await this.cookieScan.Scan(endereco); // próxima versão
  }
  @Get('getStatusCliente')
  async getStatusCliente(@Req() req) {
    const key = req.headers['component-key'];
    return await (await this.usuarioService.ObterPorAPI_KEY(key))
      .statusAtivacao;
  }
}
