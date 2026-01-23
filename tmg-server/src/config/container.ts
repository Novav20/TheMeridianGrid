import { PrismaService } from "../services/prisma.service";
import { PasswordService } from "../services/password.service";
import { TokenService } from "../services/token.service";
import { UserService } from "../services/user.service";
import { AssetService } from "../services/asset.service";
import { TelemetryService } from "../services/telemetry.service";
import { EvaluationService } from "../services/evaluation.service";
import { RuleService } from "../services/rule.service";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";
import { AssetController } from "../controllers/asset.controller";
import { TelemetryController } from "../controllers/telemetry.controller";
import { RuleController } from "../controllers/rule.controller";

/**
 * AppContainer
 *
 * Centralized Dependency Injection (DI) container.
 * Instantiates and wires up all services and controllers.
 */
class AppContainer {
  public readonly tokenService: TokenService;

  public readonly authController: AuthController;
  public readonly userController: UserController;
  public readonly assetController: AssetController;
  public readonly telemetryController: TelemetryController;
  public readonly ruleController: RuleController;

  constructor() {
    // 1. Core Infrastructure
    const prisma = PrismaService.getInstance().client;

    // 2. Instantiate Services
    const passwordService = new PasswordService();
    this.tokenService = new TokenService();
    const userService = new UserService(prisma, passwordService);
    const evaluationService = new EvaluationService(prisma);
    const telemetryService = new TelemetryService(prisma, evaluationService);
    const ruleService = new RuleService(prisma);
    const assetService = new AssetService(prisma);

    // 3. Instantiate Controllers
    this.authController = new AuthController(
      userService,
      passwordService,
      this.tokenService,
    );
    this.userController = new UserController(userService);
    this.assetController = new AssetController(assetService);
    this.telemetryController = new TelemetryController(telemetryService);
    this.ruleController = new RuleController(ruleService);
  }
}

// Export a single instance of this class.
export const container = new AppContainer();
